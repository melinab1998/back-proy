import {
    getCartsService,
    getCartByIdService,
    addCartService,
    addProductToCartService,
    deleteProductToCartService,
    deleteAllProductsFromCartService,
   /*  updateCartService, */
    updateProductQtyService 
  } from "../services/carts.services.js";

  export const getCartsController = async (req, res, next) => {
    try {
     const docs = await getCartsService();
     res.json(docs);
    } catch (error) {
      next(error);
    }
  };

  export const getByIdController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const doc = await getCartByIdService(id);
      res.json(doc);
    } catch (error) {
      next(error);
    }
  };

  export const createController = async (req, res, next) => {
    try {
      const { products } = req.body;
      const newDoc = await addCartService({
        products
      });
      res.json(newDoc);
    } catch (error) {
      next(error);
    }
  };

  export const addProductToCartController = async (req, res, next) => {
    try {
        const cart = await addProductToCartService(req.params.cid, req.params.pid)
        res.json(cart);
    } catch (error) {
      next(error);
      }
    }
  
    export const deleteProductToCartController = async (req, res, next) => {
      try {
          const cart = await deleteProductToCartService(req.params.cid, req.params.pid)
          res.json(cart);
      } catch (error) {
        next(error);
        }
      }


      export const deleteAllProductsFromCartController = async (req, res, next) => {
          try {
              const cart = await deleteAllProductsFromCartService(req.params.cid)
              res.json(cart);
          } catch (error) {
            next(error);
            }
      }
/* 
    export const updateCartController = async (req, res, next) => {
      try{
        const cid = req.params.cid
        const products = req.body
        const cart = await updateCartService(cid, { products })
        res.json(cart);
      }catch (error) {
        next(error);
      }
    } */
       

    export const updateProductQtyController = async (req, res, next) => {
      
      const cid= req.params.cid
      const pid= req.params.pid
      const quantity= req.body
      const newQ = quantity.quantity
      try {
          const cart = await updateProductQtyService(cid, pid, newQ)
          res.json(cart);
      } catch (error) {
        next(error);
      }
  }