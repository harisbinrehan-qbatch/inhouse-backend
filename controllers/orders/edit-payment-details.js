import { stripeSecretKeyClient } from '../../config/config';

const EditPaymentDetails = async (req, res) => {
  try {
    const { userStripeId, cardStripeId, paymentDetails } = req.body;

    await stripeSecretKeyClient.customers.updateSource(
      userStripeId,
      cardStripeId,
      {
        exp_month: paymentDetails.exp_month,
        exp_year: paymentDetails.exp_year
      }
    );

    res.status(200).json({ message: 'Payment details updated successfully' });
  } catch (err) {
    res.status(500).json({message: `Oops! An internal server error occurred. ${err.message}`});
  }
};

export default EditPaymentDetails;
