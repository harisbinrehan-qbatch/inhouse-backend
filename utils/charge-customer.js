import { stripeSecretKeyClient } from '../config/config';

const ChargeCustomer = async ({
  totalAmount,
  email,
  stripeId,
  cardStripeId,
  orderId,
}) => {
  try {
    console.log('In ChargeCustomer', {
      totalAmount,
      email,
      stripeId,
      cardStripeId,
      orderId,
    });

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

    console.log('Charge created successfully:', charge);

    return charge;
  } catch (error) {
    console.error('Error while charging customer on stripe:', error);
    throw new Error('Error while charging customer on stripe');
  }
};

export default ChargeCustomer;
