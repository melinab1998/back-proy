import { Router } from 'express';
import { roleMiddleware, checkOwnership, checkOwnershipOrAdmin } from '../path.js';

import {
  getAllController,
  getByIdController,
  createController,
  updateController,
  deleteController,
  getProductByController,
  productSortController,
  productSort1Controller,
  } from '../controllers/products.controllers.js';

import { createProductsCtr } from '../controllers/productsfake.controller.js';

const router = Router();

router.get('/', getAllController);
router.get('/:id', getByIdController);
router.get('/sort/up', productSortController);
router.get('/sort/down', productSort1Controller);
router.get('/search/:key/:value', getProductByController);
router.post('/', roleMiddleware(['admin', 'premium']), createController);
router.post('/mockingproducts', createProductsCtr)
router.put('/:id', roleMiddleware(['admin', 'premium']), checkOwnership, updateController); //hacerpruebas
router.delete('/:id', roleMiddleware(['admin', 'premium']), checkOwnershipOrAdmin, deleteController);

export default router;