import CartRepository from "../persistence/repository/carts.repository.js";
import CartManager from '../persistence/dao/mongodb/carts.dao.js'

const dao = new CartManager();
const cartRepository = new CartRepository(dao);

export const getCartsService = async () => {
  const getCarts = await cartRepository.getCarts();
  return getCarts;
}

export const getCartByIdService = async(id) => {
  const getById = await cartRepository.getCartById(id);
  return getById;
}

export const addCartService = async(obj) => {
  const newCart = await cartRepository.addCart(obj);
  return newCart;
}

export const addProductToCartService = async(cid, pid) => {
  const newProd = await cartRepository.addProductToCart(cid, pid);
  return newProd;
}

export const deleteProductToCartService = async(cid, pid) => {
  const delProd = await cartRepository.deleteProductFromCart(cid, pid);
  return delProd;
}

export const deleteAllProductsFromCartService = async(cid) => {
  const delAll = await cartRepository.deleteAllProductsFromCart(cid);
  return delAll;
}


export const updateProductQtyService = async(cid, pid, quantity) => {
  const upQty = await cartRepository.updateProductQty(cid, pid, quantity);
  return upQty;
}
