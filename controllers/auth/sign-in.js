import bcrypt from 'bcrypt';
import userModel from '../../models/user';
import { GenerateToken } from '../../middlewares/auth';

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email or password cannot be empty',
      });
    }

    const user = await userModel.findOne({ email });

    if (user && user.isValidUser === true) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const { username, _id, stripeId, email, mobile, isAdmin } = user;
        const token = GenerateToken(email);
        res.status(200).json({
          username,
          userId: _id,
          stripeId,
          email,
          token,
          mobile,
          isAdmin,
        });
      } else {
        res.status(401).json({
          message: 'Invalid credentials',
        });
      }
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export default SignIn;
