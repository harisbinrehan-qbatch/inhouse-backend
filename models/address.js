// products.model.js

import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  addresses: {
    type: Array,
    required: true,
  },
});

const AddressModel = mongoose.model('addresses', AddressSchema);

export default AddressModel;
