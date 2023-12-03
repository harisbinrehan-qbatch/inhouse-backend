import bcrypt from 'bcrypt';
import UserSchema from '../../models/user';
import userModel from '../../models/user';

const ResetPassword = async (req, res) => {
  try {
    const token = req.body.token || '';
    const email = req.user.email || '';
    const newPassword = req.body.newPassword;

    console.log({ token });

    const user = await userModel.findOne({ email });

    if (user.tokenExpiry === true) {
      return res.status(200).json({ message: 'Invalid or expired token' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await UserSchema.updateOne(
        { email },
        { $set: { password: hashedPassword, tokenExpiry: true } }
      );

      res.status(200).json({ message: 'Password reset successfully' });
    }
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};

export default ResetPassword;
