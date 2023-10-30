import bcrypt from 'bcrypt';
import UserSchema from '../../models/user';

const ResetPassword = async (req, res) => {
  try {

    const email = req.user.email || '';

    const newPassword = req.body.newPassword;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await UserSchema.findOneAndUpdate({ email }, { password: hashedPassword });//check

    res.status(201).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export default ResetPassword;
