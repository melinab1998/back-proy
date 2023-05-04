import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const productR = Router();
const product = new ProductManager();
const allProducts = product.readProducts();


productR.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await allProducts)
    let allProd = await allProducts;
    let productLimit = allProd.slice(0, limit);
    res.send(await productLimit)
});
    
    
productR.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProductsById(id))
});

    
productR.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})
    
productR.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})
    
productR.put("/:id", async (req, res) => {
    let id = req.params.id
    let updateProducts = req.body
     res.send(await product.updateProducts(id, updateProducts))
})


export default productR