import express from 'express';
import passport from 'passport';

import {
  DeletePaymentDetails,
  EditPaymentDetails,
  GetAddress,
  GetOrderStats,
  GetPaymentDetails,
  GetUserOrders,
  PlaceOrder,
} from '../controllers/orders';
import saveAddress from '../controllers/orders/save-address';
import UpdateDefaultAddress from '../controllers/orders/update-default-address';
import SavePaymentDetails from '../controllers/orders/save-payment-details';
import GetAllOrders from '../controllers/orders/get-orders';
import SetOrderAsDelivered from '../controllers/orders/set-isDelivered';
import GetAdminOrderStats from '../controllers/orders/get-admin-order-stats';

const router = express.Router();

router.post(
  '/placeOrder',
  passport.authenticate('jwt', { session: false }),
  PlaceOrder
);

router.post(
  '/saveAddress',
  passport.authenticate('jwt', { session: false }),
  saveAddress
);

router.get(
  '/getAddresses',
  passport.authenticate('jwt', { session: false }),
  GetAddress
);

router.put(
  '/updateDefaultAddress',
  passport.authenticate('jwt', { session: false }),
  UpdateDefaultAddress
);

router.get(
  '/getOrders',
  passport.authenticate('jwt', { session: false }),
  GetAllOrders
);

router.get(
  '/getUserOrders',
  passport.authenticate('jwt', { session: false }),
  GetUserOrders
);

router.put(
  '/setIsDelivered',
  passport.authenticate('jwt', { session: false }),
  SetOrderAsDelivered
);

router.get(
  '/getOrderStats',
  passport.authenticate('jwt', { session: false }),
  GetOrderStats
);

router.get(
  '/getAdminOrderStats',
  passport.authenticate('jwt', { session: false }),
  GetAdminOrderStats
);

router.post(
  '/paymentDetails',
  passport.authenticate('jwt', { session: false }),
  SavePaymentDetails
);

router.get(
  '/paymentDetails',
  passport.authenticate('jwt', { session: false }),
  GetPaymentDetails
);

router.put(
  '/paymentDetails',
  passport.authenticate('jwt', { session: false }),
  EditPaymentDetails
);

router.delete(
  '/paymentDetails',
  passport.authenticate('jwt', { session: false }),
  DeletePaymentDetails
);




export default router;
