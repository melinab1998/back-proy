import { Router } from "express";
import { roleMiddleware } from "../path.js";
import { isAuthenticated } from "../path.js";

import {
    getCartsController,
    getByIdController,
    createController,
    addProductToCartController,
    deleteProductToCartController,
    deleteAllProductsFromCartController,
    /* updateCartController, */
    updateProductQtyController,
    ticketController
} from '../controllers/carts.controllers.js';


const router = Router();

router.get('/', getCartsController);
router.get('/:id', getByIdController);
router.post('/', createController);
router.post('/:cid/products/:pid', roleMiddleware(['user','premium']), addProductToCartController); 
router.post('/:cid/purchase', isAuthenticated, ticketController) 
router.delete('/:cid/products/:pid', deleteProductToCartController)
router.delete('/:cid', deleteAllProductsFromCartController)
/* router.put('/:cid',  updateCartController) */
router.put('/:cid/products/:pid', updateProductQtyController)

export default router;