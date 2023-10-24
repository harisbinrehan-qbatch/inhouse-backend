import mongoose from 'mongoose';

const PaymentDetailsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
  cardholderName: {
    type: String,
    required: true,
  },
});

const PaymentDetailsModel = mongoose.model('Payments',PaymentDetailsSchema);

export default PaymentDetailsModel;
