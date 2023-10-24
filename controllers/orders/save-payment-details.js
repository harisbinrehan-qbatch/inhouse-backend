import PaymentDetailsModel from '../../models/payment-details';

const SavePaymentDetails = async (req, res) => {
  try {
    const { userId, paymentDetails } = req.body;
    console.log(userId, paymentDetails);

    const existingPaymentDetails = await PaymentDetailsModel.findOne({
      userId,
    });

    if (existingPaymentDetails) {
      existingPaymentDetails.cardNumber = paymentDetails.cardNumber;
      existingPaymentDetails.expiryDate = paymentDetails.expiryDate;
      existingPaymentDetails.cvc = paymentDetails.cvc;
      existingPaymentDetails.cardholderName = paymentDetails.cardholderName;
      await existingPaymentDetails.save();

      // Send response without userId
      res
        .status(200)
        .json({
          message: 'Payment details have been updated successfully',
          paymentDetails,
        });
    } else {
      const newPaymentDetails = new PaymentDetailsModel({
        userId,
        cardNumber: paymentDetails.cardNumber,
        expiryDate: paymentDetails.expiryDate,
        cvc: paymentDetails.cvc,
        cardholderName: paymentDetails.cardholderName,
      });
      await newPaymentDetails.save();

      // Send response without userId
      res
        .status(200)
        .json({
          message: 'Payment details have been added successfully',
          paymentDetails,
        });
    }
  } catch (error) {
    console.error('Error saving or updating payment details', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default SavePaymentDetails;
