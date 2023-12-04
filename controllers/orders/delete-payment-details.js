import { stripeSecretKeyClient } from '../../config/config';

const DeletePaymentDetails = async (req, res) => {
  try {
    const { cardStripeId, userStripeId } = req.query;

    await stripeSecretKeyClient.customers.deleteSource(
      userStripeId,
      cardStripeId
    );

    res.status(200).json({ message: 'Payment details deleted successfully' });
  } catch (err) {
    res.status(500).json({message: `Oops! An internal server error occurred. ${err.message}`});
  }
};

export default DeletePaymentDetails;
