import { Router } from 'express';

import {
  getAllController,
  getByIdController,
  createController,
  updateController,
  deleteController,
  getProductByController,
  productSortController,
  productSort1Controller
  } from '../controllers/products.controllers.js';

const router = Router();

router.get('/', getAllController);
router.get('/:id', getByIdController);
router.get('/sort/up', productSortController);
router.get('/sort/down', productSort1Controller);
router.get('/search/:key/:value', getProductByController);
router.post('/', createController);
router.put('/:id', updateController);
router.delete('/:id', deleteController);

export default router;