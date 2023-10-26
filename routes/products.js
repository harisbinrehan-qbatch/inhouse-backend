import express from 'express';
import multer from 'multer';
import passport from 'passport';

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

router.get(
  '/fetchProducts',
  FetchAllProducts
);

router.post(
  '/addProduct',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  AddProduct
);

router.delete(
  '/deleteProduct',
  passport.authenticate('jwt', { session: false }),
  DeleteProduct
);

router.put(
  '/updateProduct',
  passport.authenticate('jwt', { session: false }),
  UpdateProduct
);

export default router;
