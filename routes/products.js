import express from 'express';

import { AddProduct, FetchAllProducts } from '../controllers/products';

const router = express.Router();

router.post('/addProduct', AddProduct);
router.get('/fetchProducts', FetchAllProducts);

export default router;
