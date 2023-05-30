import { Router } from "express";
import ProductManager from "../dao/filesystem/products.dao.js"

const viewsRouter = Router();
const product = new ProductManager();


viewsRouter.get("/", async(req, res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
        title: "Websockets + Handlebars",
        products: allProducts
    })
})

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts")
});

export default viewsRouter;