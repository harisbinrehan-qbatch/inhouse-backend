import {
  stripePublishableClient,
  stripeSecretKeyClient,
} from '../../config/config';
import userModel from '../../models/user';

const SavePaymentDetails = async (req, res) => {
  try {
    const { userId, paymentDetails } = req.body;

    const response = await userModel.findOne(
      { _id: userId },
      { stripeId: 1, _id: 0 }
    );

    const { stripeId } = response;

    const { number, exp_month, exp_year, cvc } = paymentDetails;

    console.log({ paymentDetails });

    const card = await stripePublishableClient.tokens.create({
      card: {
        number,
        exp_month,
        exp_year,
        cvc,
      },
    });

    const source = await stripeSecretKeyClient.customers.createSource(
      stripeId,
      {
        source: card.id,
        metadata: {
          cardNumber: paymentDetails.cardNumber,
          userStripeId: stripeId,
        },
      }
    );

    return source;
  } catch (error) {
    console.error('Error saving or updating payment details', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default SavePaymentDetails;
