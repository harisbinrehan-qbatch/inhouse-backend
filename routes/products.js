import express from 'express';
import {
  AddProduct,
  FetchAllProducts,
  SearchProducts,
} from '../controllers/products';

const router = express.Router();

router.post('/addProduct', AddProduct);
router.get('/fetchProducts', FetchAllProducts);
router.get('/searchProducts', SearchProducts);

export default router;
