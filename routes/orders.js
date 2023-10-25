import express from 'express';
import { GetAddress, GetPaymentDetails, PlaceOrder } from '../controllers/orders';
import saveAddress from '../controllers/orders/save-address';
import UpdateDefaultAddress from '../controllers/orders/update-default-address';
import SavePaymentDetails from '../controllers/orders/save-payment-details';
import GetAllOrders from '../controllers/orders/get-orders';

const router = express.Router();

router.post('/placeOrder', PlaceOrder);
router.post('/saveAddress', saveAddress);
router.get('/getAddresses', GetAddress);
router.put('/updateDefaultAddress', UpdateDefaultAddress);
router.post('/paymentDetails', SavePaymentDetails);
router.get('/GetPaymentDetails', GetPaymentDetails);
router.get('/getOrders', GetAllOrders);

export default router;
