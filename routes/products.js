import express from 'express';
import {
  AddProduct,
  FetchAllProducts,
  DeleteProduct,
  UpdateProduct,
} from '../controllers/products';

const router = express.Router();

router.post('/addProduct', AddProduct);
router.get('/fetchProducts', FetchAllProducts);
router.delete('/deleteProduct', DeleteProduct);
router.put('/updateProduct', UpdateProduct);

export default router;
