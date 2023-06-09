import { Router } from "express";

import {
    getCartsController,
    getByIdController,
    createController,
    addProductToCartController,
    deleteProductToCartController,
    deleteAllProductsFromCartController,
    /* updateCartController, */
    updateProductQtyController
} from '../controllers/carts.controllers.js';

const router = Router();

router.get('/', getCartsController);
router.get('/:id', getByIdController);
router.post('/', createController);
router.post('/:cid/products/:pid', addProductToCartController); 
router.delete('/:cid/products/:pid', deleteProductToCartController)
router.delete('/:cid', deleteAllProductsFromCartController)
/* router.put('/:cid',  updateCartController) */
router.put('/:cid/products/:pid', updateProductQtyController)

export default router;