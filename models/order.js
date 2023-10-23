// orders.model.js

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  subTotal: {
    type: String,
    required: true,
  },
  tax: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model('orders', OrderSchema);

export default OrderModel;
