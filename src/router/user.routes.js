import { Router } from 'express'
import UserDao from '../dao/mongodb/user.dao.js'
import { userModel } from '../dao/mongodb/models/user.model.js'
const userDao = new UserDao()

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const userData = req.body
    const newUser = await userDao.createUser(userData)
    if(newUser){
        res.redirect('/views')
    } else {
        res.redirect('/views/error-register')
    }
  } catch (error) {
    console.log(error);
  }
})

router.post('/login', async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await userDao.loginUser(req.body);
        if(user){
          const userName = user.first_name;
          const userLast = user.last_name;
          req.session.email = email;
          req.session.password = password;
          req.session.first_name = userName;
          req.session.last_name = userLast;
          res.redirect('/views/products');
        } else {
          res.redirect('/views/error-login');
        }
    } catch (error) {
      console.log(error);
    }
})

router.get('/logout', async(req, res) => {
  try {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }else{
            res.redirect('/views');
        };
    });
} catch (error) {
  console.log(error);
}
})

export default router