import {promises as fs} from "fs"
import { nanoid } from "nanoid"

class ProductManager{

    constructor(){
        this.path="./src/models/products.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(prod => prod.id === id)
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    addProducts = async(product)=>{
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll);
        return "Producto Agregado"
    };


    getProducts = async () =>{
        return await this.readProducts();
    }

    getProductsById = async (id) =>{
        let productsId = await this.exist(id)
        if(!productsId) return "Producto no encontrado"
        return productsId
    };

    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProduct = products.some(prod => prod.id === id)
        if(existProduct) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto Eliminado"
        }
        return "El producto a eliminar no existe"  
    } 


    updateProducts = async (id, product) => {
        let productsId = await this.exist(id)
        if(!productsId) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products)
        return "Producto Actualizado"
    }
}

export default ProductManager

