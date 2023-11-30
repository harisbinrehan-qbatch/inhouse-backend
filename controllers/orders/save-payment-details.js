import {
  stripePublishableClient,
  stripeSecretKeyClient,
} from '../../config/config';
import userModel from '../../models/user';

const SavePaymentDetails = async (req, res) => {

  try {
    const { userId, paymentDetails } = req.body;
    
    console.log({ userId, paymentDetails });
    const response = await userModel.findOne(
      { _id: userId },
      { stripeId: 1, _id: 0 }
    );

    const { stripeId } = response;

    const { number, exp_month, exp_year } = paymentDetails;

    console.log({stripeId})

    const card = await stripePublishableClient.tokens.create({
      card: {
        number,
        exp_month,
        exp_year,
        cvc:123,
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

    console.log('++++++++++', source)

    return source;
  } catch (error) {
    console.log('Error saving or updating payment details', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default SavePaymentDetails;
