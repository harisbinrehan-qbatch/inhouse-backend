import bcrypt from 'bcrypt';
import userModel from '../../models/user';
import { GenerateToken } from '../../middlewares/auth';

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Bad Request: Email or password cannot be empty',
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'Not Found: User not found',
      });
    }

    if (!user.isValidUser) {
      return res.status(401).json({
        message: 'Unauthorized: User account is not valid',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const { username, _id, stripeId, email, mobile, isAdmin } = user;
      const token = GenerateToken(email);
      return res.status(200).json({
        username,
        userId: _id,
        stripeId,
        email,
        token,
        mobile,
        isAdmin,
      });
    } else {
      return res.status(401).json({
        message: 'Unauthorized: Invalid credentials',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Oops! An internal server error occurred. ${err.message}`,
    });
  }
};

export default SignIn;
