import bcrypt from 'bcrypt';
import userModel from '../../models/user';
import { stripeSecretKeyClient } from '../../config/config';
const SignUp = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        message: 'Username, email, and password cannot be empty',
      });
    }

    const existingUserWithEmail = await userModel.findOne({ email });

    if (existingUserWithEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser.save();

      // eslint-disable-next-line no-unused-vars
      const customer = await stripeSecretKeyClient.customers.create({
        name: newUser.username,
        email: newUser.email
      });
      

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default SignUp;
