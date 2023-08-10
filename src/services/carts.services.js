import CartRepository from "../persistence/repository/carts.repository.js";
import CartManager from '../persistence/dao/mongodb/carts.dao.js'
import {logger} from '../utils/logger.js'

const dao = new CartManager();
const cartRepository = new CartRepository(dao);

export const getCartsService = async () => {
  try {
    const getCarts = await cartRepository.getCarts();
     return getCarts;
   } catch (error){
    logger.error(error.message)
     throw new Error(error.message);
   }
}

export const getCartByIdService = async(id) => {
  try {
    const getById = await cartRepository.getCartById(id);
    return getById;
  } catch (error) {
    logger.error(error.message)
    throw new Error(error.message);
  }
}

export const addCartService = async(obj) => {
  try {
    const newCart = await cartRepository.addCart(obj);
    return newCart;
  } catch (error) {
    logger.error(error.message)
    throw new Error(error.message);
  }
}

export const addProductToCartService = async(cid, pid) => {
  try {
    const newProd = await cartRepository.addProductToCart(cid, pid);
    return newProd;
  } catch (error) {
    logger.error(error.message)
    throw new Error(error.message);
  }
}

export const deleteProductToCartService = async(cid, pid) => {
  try {
    const delProd = await cartRepository.deleteProductFromCart(cid, pid);
    return delProd;
  } catch (error) {
    logger.error(error.message)
    throw new Error(error.message);
  }
}

export const deleteAllProductsFromCartService = async(cid) => {
  try {
    const delAll = await cartRepository.deleteAllProductsFromCart(cid);
    return delAll;
  } catch (error) {
    logger.error(error.message)
    throw new Error(error.message);
  }
}


export const updateProductQtyService = async(cid, pid, quantity) => {
  try {
    const upQty = await cartRepository.updateProductQty(cid, pid, quantity);
    return upQty;
  } catch (error) {
    logger.error(error.message)
    throw new Error(error.message);
  }
}


