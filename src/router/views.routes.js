import { Router } from "express";
import { sendPasswordResetEmail } from "../controllers/email.controller.js";
import { verifyResetToken } from "../utils/token.email.js";
import { generateResetToken } from "../utils/token.email.js";
import { logger } from "../utils/logger.js";
import UserDao from "../persistence/dao/mongodb/user.dao.js";
const userDao = new UserDao()


/* import ProductManager from "../persistence/dao/filesystem/products.dao.js" */

const viewsRouter = Router();
/* const product = new ProductManager();


viewsRouter.get("/products", async(req, res) => {
    let allProducts = await product.getProducts()
    const first_name = req.session.first_name;
    const last_name = req.session.last_name;
    res.render("home", {
        products: allProducts,
        data: {first_name, last_name}
    })
})

viewsRouter.get("/realtimeproducts", async(req, res) => {
    let allProducts = await product.getProducts()
    res.render("realTimeProducts",{
        products: allProducts,
        baseUrl: "http://localhost:8080"
    })
});  */
 
viewsRouter.get('/',(req,res)=>{
    res.render('login', {
        baseUrl: "http://localhost:8080"
    })
})

viewsRouter.get('/register',(req,res)=>{
    res.render('register', {
        baseUrl: "http://localhost:8080"
    })
})

viewsRouter.get('/error-register',(req,res)=>{
    res.render('errorRegister', {
        baseUrl: "http://localhost:8080"
    })
})

viewsRouter.get('/error-login',(req,res)=>{
    res.render('errorLogin', {
        baseUrl: "http://localhost:8080"
    })
})

viewsRouter.get('/recoverpass',(req,res)=>{
    res.render('recoverPass', {
        baseUrl: "http://localhost:8080"
    })
})
  
viewsRouter.get('/resetpass/:token', async (req, res) => {
  const resetToken = req.params.token;
  try {
    const userEmail = verifyResetToken(resetToken);

    res.render('resetPass', {
      baseUrl: "http://localhost:8080",
      userEmail: userEmail,
      resetToken: resetToken
    });

  } catch (error) {
    if (error.message === 'Token inválido o expirado.') {
      res.redirect('/views/recoverpass');
    } else {
      logger.error(error.message);
      res.status(500).send('Ocurrió un error.');
    }
  }
});

viewsRouter.post('/send-email', async (req, res) => {
  const { email } = req.body;
  try {
    const resetToken = generateResetToken(email);
    await sendPasswordResetEmail(email, resetToken);

    res.status(200).send('Correo de restablecimiento enviado. Verifica tu bandeja de entrada.');
  } catch (error) {
    res.status(500).send('Error al enviar el correo de restablecimiento.');
  }
});

viewsRouter.post('/resetpass/:token', async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const resetToken = req.params.token; 

  try {
    if (newPassword !== confirmPassword) {
      res.render('resetPass', {
        baseUrl: "http://localhost:8080",
        resetToken: resetToken,
        errorMessage: 'Las contraseñas no coinciden.'
      });

    }else{
      const userEmail = verifyResetToken(resetToken);
      await userDao.updateUserPasswordAndEncrypt(userEmail, newPassword);
  
      return res.render('login', {
        baseUrl: "http://localhost:8080"
      });
  
    }
  } catch (error) {
    logger.error(error.message);
    res.render('resetPass', {
      baseUrl: "http://localhost:8080",
      resetToken: resetToken,
      errorMessage: 'La nueva contraseña no puede ser igual a la contraseña anterior.'
    });
  }
});

export default viewsRouter;