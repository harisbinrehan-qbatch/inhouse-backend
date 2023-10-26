import express from 'express';
import { GetAddress, GetOrderStats, GetPaymentDetails, PlaceOrder } from '../controllers/orders';
import saveAddress from '../controllers/orders/save-address';
import UpdateDefaultAddress from '../controllers/orders/update-default-address';
import SavePaymentDetails from '../controllers/orders/save-payment-details';
import GetAllOrders from '../controllers/orders/get-orders';
import SetOrderAsDelivered from '../controllers/orders/set-isDelivered';

const router = express.Router();

router.post('/placeOrder', PlaceOrder);
router.post('/saveAddress', saveAddress);
router.get('/getAddresses', GetAddress);
router.put('/updateDefaultAddress', UpdateDefaultAddress);
router.post('/paymentDetails', SavePaymentDetails);
router.get('/GetPaymentDetails', GetPaymentDetails);
router.get('/getOrders', GetAllOrders);
router.put('/setIsDelivered', SetOrderAsDelivered);
router.get('/getOrderStats', GetOrderStats);

export default router;
