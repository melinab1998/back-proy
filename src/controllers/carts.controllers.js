import {
    getCartsService,
    getCartByIdService,
    addCartService,
    addProductToCartService
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
  


  