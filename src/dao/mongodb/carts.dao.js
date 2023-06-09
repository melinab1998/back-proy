import {cartModel} from './models/carts.model.js'
import ProductsDaoMongoDB from './products.dao.js'


const products = new ProductsDaoMongoDB();


class CartManager {

//Obtener todos los carritos

    getCarts = async () => {
        try {
            const carts = cartModel.find();
            return carts;
        } catch (error) {
            console.log(error);
        }
    }

//Obtener un carrito por su id

    getCartById = async (id) => {
        try {
            const cartById = cartModel.findOne({_id: id}).populate('products.product')
            return cartById ? cartById : {};
        } catch (error) {
            console.log(error);
            return {}
        }
    }

//Añadir un carrito

    addCart = async () => {
        try {
            cartModel.create({products: []});
            return {message: 'Carrito creado'};
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }

//Eliminar producto de un carrito  

    deleteProductFromCart = async (cid, pid) => {
        try {
            const cart = await cartModel.findById(cid)
            if(!cart) return 'No se encontró el carrito';
            const product = await products.getProductsById(pid);
            const productIndex = cart.products.findIndex(prod => prod.product.equals(product._id));
      
            if (productIndex !== -1) {
              cart.products.splice(productIndex, 1);
              await cart.save();
              console.log('Producto borrado de carrito');
              return cart;
            } else {
              console.log('No se encontró el producto en el carrito');
              return null;
            }
      
          } catch(error) {
            console.log(error);
          }
    }

//Vaciar carrito
    
    deleteAllProductsFromCart = async (cid) => {
    try {
      await cartModel.updateOne({ _id: cid }, { products: []});
      console.log('Carrito vaciado');
    } catch(error) {
      console.log(error);
    }
  }

/* 

//Actualizar carrito con nuevos productos

    updateCart = async (cid, newData) => {

      return await cartModel.updateOne(
        { _id: cid },
        { $set: { products: newData.products, quantity: newData.quantity }}
      )
    }
*/

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
            console.log(error);
            }
        }
}

export default CartManager;

