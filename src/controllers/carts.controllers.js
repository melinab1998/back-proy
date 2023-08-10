import {
    getCartsService,
    getCartByIdService,
    addCartService,
    addProductToCartService,
    deleteProductToCartService,
    deleteAllProductsFromCartService,
    updateProductQtyService 
  } from "../services/carts.services.js";

  import {createTicketService} from '../services/ticket.services.js'
  import {updateService} from '../services/products.services.js'
  import { v4 as uuidv4 } from 'uuid'
  import { sendGmail } from '../controllers/email.controller.js'
  import {logger} from '../utils/logger.js'

  export const getCartsController = async (req, res, next) => {
    try {
     const docs = await getCartsService();
     res.json(docs);
    } catch (error){
      logger.error(error.message)
      next(error);
    }
  };

  export const getByIdController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const doc = await getCartByIdService(id);
      res.json(doc);
    } catch (error) {
      logger.error(error.message)
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
      logger.error(error.message)
      next(error);
    }
  };

  export const addProductToCartController = async (req, res, next) => {
    try {
        const cart = await addProductToCartService(req.params.cid, req.params.pid)
        res.json(cart);
    } catch (error) {
      logger.error(error.message)
      next(error);
      }
    }
  
    export const deleteProductToCartController = async (req, res, next) => {
      try {
          const cart = await deleteProductToCartService(req.params.cid, req.params.pid)
          res.json(cart);
      } catch (error) {
        logger.error(error.message)
        next(error);
        }
      }


      export const deleteAllProductsFromCartController = async (req, res, next) => {
          try {
              const cart = await deleteAllProductsFromCartService(req.params.cid)
              res.json(cart);
          } catch (error) {
            logger.error(error.message)
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
        logger.error(error.message)
        next(error);
      }
  }

  export const ticketController = async(req, res, next) => {

    try {
      const ticket = [];
      const outOfStock = [];

      const cart = await getCartByIdService(req.params.cid);

      for (const item of cart.products) {
        if (item.quantity <= item.product.stock) {
          ticket.push(item);
  
          const newStock = item.product.stock - item.quantity;
          await updateService(item.product._id, { stock: newStock });
        } else {
          outOfStock.push(item);
        }
      }
  
      const totalPrice = ticket.reduce((acc, item) => {
        const productPrice = item.product.price;
        const quantity = item.quantity;
        const itemTotalPrice = productPrice * quantity;
        return acc + itemTotalPrice;
      }, 0);
  
      const userEmail = req.user.email;
      const userName = req.user.first_name;
  
      const code = uuidv4();
  
      const ticketData = {
        code,
        purchase_datetime: new Date(),
        amount: totalPrice,
        purchaser: userEmail,
      };
  
      const emailOptions = {
        name: userName,
      };
  
      const newTicket = await createTicketService(ticketData);
  
      try {
       
        await sendGmail(emailOptions, ticketData);
  
        
        if (outOfStock.length > 0) {
          return res.status(200).send({ ticket: newTicket, productosSinStock: outOfStock });
        } else {
          res.status(200).send({ newTicket });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al enviar el correo electrónico' });
      }
  
      for (const item of ticket) {
        const productId = item.product._id;
        console.log({ item: productId });
        await deleteProductToCartService(req.params.cid, productId);
      }
    } catch (error) {
      logger.error(error.message)
      next(error);
    }
  };

