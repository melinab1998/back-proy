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



  