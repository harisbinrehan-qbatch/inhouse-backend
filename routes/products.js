import express from 'express';
import passport from 'passport';

import multerConfig from '../middlewares/multerConfig';
import {
  AddProduct,
  DeleteProduct,
  UpdateProduct,
  FetchUserProducts,
  FetchAdminProducts,
  AddBulkProducts
} from '../controllers/products';

const router = express.Router();

const upload = multerConfig();

router.get('/fetchUserProducts', FetchUserProducts);

router.get(
  '/fetchAdminProducts',
  passport.authenticate('jwt', { session: false }),
  FetchAdminProducts
);

router.post(
  '/addProduct',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  AddProduct
);

router.post(
  '/addBulkProducts',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  AddBulkProducts
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
