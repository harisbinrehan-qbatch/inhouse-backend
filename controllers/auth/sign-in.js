import bcrypt from 'bcrypt';

import userModel from '../../models/user';
import { GenerateToken } from '../../middlewares/auth';

export const SignIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username or password cannot be empty',
      });
    }

    const result = await userModel.findOne({ username });

    if (result) {
      const isPasswordValid = await bcrypt.compare(password, result.password);

      if (isPasswordValid) {
        const token = GenerateToken(result);
        res.status(200).json({
          username: username,
          email: result.email,
          token: token,
          mobile: result.mobile,
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
