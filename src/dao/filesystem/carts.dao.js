import {promises as fs} from "fs"
import { nanoid } from "nanoid"
import ProductManager from "./products.dao.js"

const productAll = new ProductManager

class CartManager{
    constructor(){
        this.path = "./src/models/carts.json"
    }

    readCart = async() => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCart = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    addCart = async() => {
        let cartsOld = await this.readCart();
        let id = nanoid()
        let cartsC = [{id : id, products : []}, ...cartsOld]
        await this.writeCart(cartsC)
        return "Carrito Agregado"
    }

    exist = async (id) => {
        let carts = await this.readCart();
        return carts.find(cart => cart.id === id)
    }

    getCartById = async (id) =>{
        let cartId = await this.exist(id)
        if(!cartId) return "Carrito no encontrado"
        return cartId
    };


    addProductInCart = async (cartId, productId) => {

        let cartById = await this.exist(cartId)
        if(!cartById) return "Carrito no encontrado"
        let productById = await productAll.exist(productId)
        if(!cartById) return "Producto no encontrado"

        let cartAll = await this.readCart()
        let cartFilter = cartAll.filter((cart) => cart.id != cartId)

        if(cartById.products.some((prod) => prod.id === productId)){
            let productInCart = cartById.products.find((prod) => prod.id === productId)
            productInCart.quantitiy++
            let cartC = [cartById, ...cartFilter]
            await this.writeCart(cartC)
            return "Producto sumado al carrito"
        }

        cartById.products.push({id: productById.id, quantitiy:1})

        let cartC = [cartById, ...cartFilter];
        await this.writeCart(cartC)
        return "Producto agregado al carrito"
    }
}

export default CartManager 