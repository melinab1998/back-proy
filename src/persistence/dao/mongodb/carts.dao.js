import {cartModel} from './models/carts.model.js'
import ProductsDaoMongoDB from './products.dao.js'
import {logger} from '../../../utils/logger.js'

const products = new ProductsDaoMongoDB();


class CartManager {

//Obtener todos los carritos

    getCarts = async () => {
        try {
            const carts = cartModel.find();
            return carts;
        } catch (error) {
            logger.error(error.message)
            throw new Error(error.message)
        }
    }

//Obtener un carrito por su id

    getCartById = async (id) => {
        try {
            const cartById = cartModel.findOne({_id: id}).populate('products.product')
            return cartById ? cartById : {};
        } catch (error) {
            logger.error(error.message)
            throw new Error(error.message)
            return {}
        }
    }

//Añadir un carrito

    addCart = async () => {
        try {
            cartModel.create({products: []});
            return {message: 'Carrito creado'};
        } catch (error) {
          logger.error(error.message)
          throw new Error(error.message)
        }
    }

//Añadir producto a un carrito

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await cartModel.findById(cid)
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
          logger.error(error.message)
          throw new Error(error.message)
        }
    }

    deleteProductFromCart = async (cid, pid) => {
        try {
          const cart = await cartModel.findById(cid)
          if (!cart) return 'No se encontró el carrito';
      
          const product = await products.getProductsById(pid);
          if (!product) return 'No se encontró el producto';
      
          const productIndex = cart.products.findIndex(prod => prod.product && prod.product.equals(product._id));
      
          if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            logger.info('Producto borrado de carrito');
            return cart;
          } else {
            logger.info('No se encontró el producto en el carrito');
            return null;
          }
      
        } catch (error){
          logger.error(error.message)
          throw new Error(error.message)
        }
      }

//Vaciar carrito
    
    deleteAllProductsFromCart = async (cid) => {
    try {
      await cartModel.updateOne({ _id: cid }, { products: []});
      logger.info('Carrito vaciado');
    } catch(error) {
      logger.error(error.message)
      throw new Error(error.message)
    }
  }


//Actualizar cantidad de un producto

    updateProductQty= async(cid, pid, quantity)=>{
        try {
            const cart = await cartModel.findById(cid)
            if(!cart) return 'No se encontró el carrito';
            const product = await products.getProductsById(pid);
            const productIndex = cart.products.findIndex(prod => prod.product.equals(product._id));
      
            if (productIndex >= 0) {
              cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.push({_id: pid, quantity: quantity});
            }
              await cart.save();
              return cart
            } catch(error) {
              logger.error(error.message)
              throw new Error(error.message)
            }
        }
}

export default CartManager;
