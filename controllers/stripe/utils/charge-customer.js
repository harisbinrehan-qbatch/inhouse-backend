import { stripeSecretKeyClient } from '../../../config/config';

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

    return charge;
  } catch (error) {
    console.error('Error while charging customer on stripe:', error);
    throw new Error('Error while charging customer on stripe');
  }
};

export default ChargeCustomer;
