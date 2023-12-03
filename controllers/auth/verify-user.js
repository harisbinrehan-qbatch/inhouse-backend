import userModel from '../../models/user';

const VerifyUser = async (req, res) => {
  console.log('In API', req.user.email);

  try {
    const { email } = req.user;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400);
    } else {
      await userModel.updateOne({ email }, { $set: { isValidUser: true } });
    }

    console.log({ user });
    res.status(200).json({ message: 'Verification successful' });
  } catch (err) {
    console.error('Error during user verification:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default VerifyUser;
