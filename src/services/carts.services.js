import CartManager from "../dao/mongodb/carts.dao.js"

const cartDao = new CartManager();

export const getCartsService = async () => {
    try {
     const docs = await cartDao.getCarts();
     return docs;
    } catch (error) {
      console.log(error);
    }
};

export const getCartByIdService = async(id) => {
    try {
      const doc = await cartDao.getCartById(id);
      if(!doc) throw new Error('Carrito no encontrado')
      else return doc;
    } catch (error) {
      console.log(error);
    }
};

export const addCartService = async(obj) => {
    try {
      const newCart = await cartDao.addCart(obj);
      if(!newCart) throw new Error('Error de Validación')
      else return newCart;
    } catch (error) {
      console.log(error);
    }
};

export const addProductToCartService = async (cid, pid) => {
    try{
        const newProd = await cartDao.addProductToCart(cid, pid)
        if(!newProd) throw new Error('Error al añadir producto al carrito')
      else return newProd;
    } catch (error) {
        console.log(error);
    }
};


export const deleteProductToCartService = async (cid, pid) => {
  try{
      const prodDelete = await cartDao.deleteProductFromCart(cid, pid)
      if(!prodDelete) throw new Error('Error al eliminar el producto del carrito')
    else return prodDelete;
  } catch (error) {
      console.log(error);
  }
};

export const deleteAllProductsFromCartService = async (cid) => {
  try{
     await cartDao.deleteAllProductsFromCart(cid)
  } catch (error) {
      console.log('Error al vaciar carrito');
  }
};

/* export const updateCartService = async (cid, newData) => {
  try{
    await cartDao.updateCart(cid, newData)
  } catch (error) {
      console.log('Error al actualizar carrito');
  }
}; */

export const updateProductQtyService = async (cid, pid, quantity) => {
  try{
    await cartDao.updateProductQty(cid, pid, quantity)
  } catch (error) {
      console.log('Error al actualizar la cantidad');
  }
};