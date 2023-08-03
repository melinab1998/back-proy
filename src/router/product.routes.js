import { Router } from 'express';
import { roleMiddleware } from '../path.js';

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
router.post('/',  roleMiddleware('admin'), createController);
router.post('/mockingproducts', createProductsCtr)
router.put('/:id', roleMiddleware('admin'), updateController);
router.delete('/:id', roleMiddleware('admin'), deleteController);

export default router;