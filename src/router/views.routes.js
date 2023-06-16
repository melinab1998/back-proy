import { Router } from "express";
import ProductManager from "../dao/filesystem/products.dao.js"

const viewsRouter = Router();
const product = new ProductManager();


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
}); 
 
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

  
export default viewsRouter;