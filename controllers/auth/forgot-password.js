import userModel from '../../models/user';
import { GenerateToken } from '../../middlewares/auth';
import sendEmail from '../../utils/nodemailer';

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    console.log(email);

    if (!email) {
      return res.status(400).json({
        message: 'email cannot be empty',
      });
    }

    const result = await userModel.findOne({ email });
    console.log('Result', result);

    if (result) {
        const token = GenerateToken(email);
        await sendEmail(
            email,
            token
        )
    } else {
      res.status(401).json({
        message: 'User not found',
      });
    }
    return res.status(200).send('Email send success');
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export default ForgotPassword;
