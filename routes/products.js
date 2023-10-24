import express from 'express';
import multer from 'multer';

import {
  AddProduct,
  FetchAllProducts,
  DeleteProduct,
  UpdateProduct,
} from '../controllers/products';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post('/addProduct', upload.any() ,AddProduct);
router.get('/fetchProducts', FetchAllProducts);
router.delete('/deleteProduct', DeleteProduct);
router.put('/updateProduct', UpdateProduct);

export default router;
