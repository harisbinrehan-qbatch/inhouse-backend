import bcrypt from 'bcrypt';
import UserSchema from '../../models/user';
import userModel from '../../models/user';

const ResetPassword = async (req, res) => {
  try {
    const email = req.user.email || '';

    const { newPassword } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Not Found: User not found' });
    }

    if (user.tokenExpiry === true) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await UserSchema.updateOne(
      { email },
      { $set: { password: hashedPassword, tokenExpiry: true } }
    );

    res.status(200).json({ message: 'Success: Password reset successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default ResetPassword;
