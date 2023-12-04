import { stripeSecretKeyClient } from '../../config/config';
import userModel from '../../models/user';

const GetPaymentDetails = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await userModel.findOne({ _id: { $in: userId } });

    const cards = await stripeSecretKeyClient.customers.listSources(
      user.stripeId,
      {
        object: 'card',
      }
    );

    const allPaymentMethods = cards.data.map((card) => ({
      cardholderName: user.username,
      cardNumber: card.last4,
      cardId: card.id,
      brand: card.brand,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
    }));

    res.status(200).json({ allPaymentMethods });
  } catch (err) {
    res.status(500).json({
      message: `Oops! An internal server error occurred. ${err.message}`,
    });
  }
};

export default GetPaymentDetails;
