import express from 'express';
import { GetAddress, PlaceOrder } from '../controllers/orders';
import saveAddress from '../controllers/orders/save-address';
import UpdateDefaultAddress from '../controllers/orders/update-default-address';

const router = express.Router();

router.post('/placeOrder', PlaceOrder);
router.post('/saveAddress', saveAddress);
router.get('/getAddresses', GetAddress);
router.put('/updateDefaultAddress', UpdateDefaultAddress);

export default router;