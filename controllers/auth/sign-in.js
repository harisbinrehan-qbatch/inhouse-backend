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

    const result = await userModel.findOne({ email });

    if (result) {
      const isPasswordValid = await bcrypt.compare(password, result.password);

      if (isPasswordValid) {
        const token = GenerateToken(email);
        res.status(200).json({
          username: result.username,
          userId: result._id,
          stripeId: result.stripeId,
          email: result.email,
          token: token,
          mobile: result.mobile,
          isAdmin: result.isAdmin,
          image: result.image,
        });
      } else {
        res.status(401).json({
          message: 'Invalid credentials',
        });
      }
    } else {
      res.status(401).json({
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
