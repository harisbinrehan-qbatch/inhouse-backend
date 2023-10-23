import express from 'express';
import { PlaceOrder } from '../controllers/orders';
import saveAddress from '../controllers/orders/save-address';

const router = express.Router();

router.post('/placeOrder', PlaceOrder);
router.post('/saveAddress', saveAddress);

export default router;
