import express from 'express';
import {
  AddProduct,
  FetchAllProducts,
  SearchProducts,
  DeleteProduct,
  EditProduct,
} from '../controllers/products';

const router = express.Router();

router.post('/addProduct', AddProduct);
router.get('/fetchProducts', FetchAllProducts);
router.get('/searchProducts', SearchProducts);
router.delete('/deleteProduct', DeleteProduct);
router.put('/editProduct', EditProduct);

export default router;
