import PaymentDetailsSchema from '../../models/payment-details';

const GetPaymentDetails = async (req, res) => {
  try {
    const { userId } = req.query;

    const payments = await PaymentDetailsSchema.find({ userId });

    // console.log(payments.name);
    res.status(200).json({ payments });
  } catch (error) {
    console.error('Error retrieving payment details', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default GetPaymentDetails;
