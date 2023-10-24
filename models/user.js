import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  }
  });
const userModel = new mongoose.model('users', User);

export default userModel;