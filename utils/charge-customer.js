import OrderModel from '../models/order';
import { stripeSecretKeyClient } from '../config/config';

const ChargeCustomer = async ({
  totalAmount,
  email,
  stripeId,
  cardStripeId,
  orderId,
}) => {
  try {
    const charge = await stripeSecretKeyClient.charges.create({
      amount: 100 * totalAmount,
      currency: 'usd',
      customer: stripeId,
      card: cardStripeId,
      receipt_email: email,
      metadata: {
        orderId: orderId,
      },
    });

    if (charge.status === 'succeeded') {
      const orderId = charge.metadata.orderId;

      await OrderModel.findOneAndUpdate(
        { orderId: orderId },
        { $set: { isPaid: true } },
        { new: true }
      );
    }
    
    return charge;
  } catch (error) {
    console.error('Error while charging customer on stripe:', error);
    throw new Error('Error while charging customer on stripe');
  }
};

export default ChargeCustomer;
