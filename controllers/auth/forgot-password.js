import { GenerateToken } from '../../middlewares/auth';

import userModel from '../../models/user';
import sendResetEmail from '../../utils/send-rest-email';

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Email cannot be empty',
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      const token = GenerateToken(email);
       await userModel.updateOne({ email }, { $set: { tokenExpiry: false } });
      await sendResetEmail(email, token);
      return res.status(200).send('Email sent successfully');
    } else {
      return res.status(401).json({
        message: 'Invalid email. User not found.',
      });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(400).json({
      message: 'Internal Server Error',
    });
  }
};

export default ForgotPassword;

