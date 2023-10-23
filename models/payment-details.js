// products.model.js

import mongoose from 'mongoose';

const PaymentDetailsSchema = new mongoose.Schema({
  paymentDetails: {
    type: Array,
    required: true,
  },
});

const PaymentDetailsModel = mongoose.model('payment', PaymentDetailsSchema);

export default PaymentDetailsModel;
