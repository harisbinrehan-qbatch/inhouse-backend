import { GenerateToken } from '../../middlewares/auth';
import userModel from '../../models/user';
import sendResetEmail from '../../utils/send-rest-email';

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Bad Request: Email cannot be empty',
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      const token = GenerateToken(email);

      await userModel.updateOne({ email }, { $set: { tokenExpiry: false } });

      await sendResetEmail(email, token);

      return res.status(200).json({
        message: 'Success: Email sent successfully',
      });
    } else {
      return res.status(404).json({
        message: 'Not Found: User not found with the provided email',
      });
    }
  }  catch (err) {
    res
      .status(500)
      .json({
        message: `Oops! An internal server error occurred. ${err.message}`,
      });
  }
};

export default ForgotPassword;
