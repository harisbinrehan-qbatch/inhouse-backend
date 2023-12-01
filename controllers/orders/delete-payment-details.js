import { stripeSecretKeyClient } from '../../config/config';

const DeletePaymentDetails = async (req, res) => {
  try {
    const {cardStripeId, userStripeId}=  req.query;
    
    const deleted = await stripeSecretKeyClient.customers.deleteSource(
      userStripeId,
      cardStripeId
    );
    res.status(200).json(deleted);
  } catch (error) {
    console.log('Error saving or updating payment details', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default DeletePaymentDetails;
