import {cartModel} from './models/carts.model.js'
import ProductsDaoMongoDB from './products.dao.js'


const products = new ProductsDaoMongoDB();

class CartManager {

    getCarts = async () => {
        try {
            const carts = cartModel.find();
            return carts;
        } catch (error) {
            console.log(error);
        }
    }

    getCartById = async (id) => {
        try {
            const cartById = cartModel.findOne({_id: id});
            return cartById ? cartById : {};
        } catch (error) {
            console.log(error);
            return {}
        }
    }

    addCart = async () => {
        try {
            cartModel.create({products: []});
            return {message: 'Carrito creado'};
        } catch (error) {
            console.log(error);
        }
    }

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await this.getCartById(cid);
            if(!cart) return 'No se encontró el carrito';
            const product = await products.getProductsById(pid);
            if(Object.keys(product).length === 0) return 'Producto no encontrado en la base de datos';

            const prodIndex = cart.products.findIndex(prod => prod.product.equals(product._id));
            
            if(prodIndex !== -1) {
                cart.products[prodIndex].quantity ++;
                await cartModel.updateOne({_id: cid}, cart);
                return 'Producto sumado al carrito';
            } else {
                cart.products.push({product: pid, quantity: 1});
                await cartModel.updateOne({_id: cid}, cart);
                return 'Producto agregado al carrito';
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default CartManager;

