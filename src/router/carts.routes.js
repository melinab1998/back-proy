import { Router } from "express";

import {
    getCartsController,
    getByIdController,
    createController,
    addProductToCartController
} from '../controllers/carts.controllers.js';

const router = Router();

router.get('/', getCartsController);
router.get('/:id', getByIdController);
router.post('/', createController);
router.post('/:cid/products/:pid', addProductToCartController); 


export default router;