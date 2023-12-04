import userModel from '../../models/user';

const VerifyUser = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Not Found: User not found' });
    } else {
      if (user.isValidUser) {
        return res.status(200).json({ message: 'Success: User is already verified' });
      }

      await userModel.updateOne({ email }, { $set: { isValidUser: true } });
    }

    res.status(200).json({ message: 'Success: Verification successful' });
  } catch (err) {
    res.status(500).json({message: `Oops! An internal server error occurred. ${err.message}`});
  }
};

export default VerifyUser;
