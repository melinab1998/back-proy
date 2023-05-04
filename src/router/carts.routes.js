import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartR = Router();
const carts = new CartManager


cartR.get("/", async(req, res) => {
    res.send(await carts.readCart())
})

cartR.post("/", async(req, res) => {
    res.send(await carts.addCart())
})

cartR.get("/:id", async(req, res) => {
    res.send(await carts.getCartById(req.params.id))
})

cartR.post('/:cid/products/:pid', async(req, res)=>{
let cartId = req.params.cid
let productId = req.params.pid
res.send(await carts.addProductInCart(cartId, productId))
})


export default cartR