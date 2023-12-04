import AddressModel from '../../models/address';

const GetAddress = async (req, res) => {
  try {
    const { userId } = req.query;

    const addresses = await AddressModel.find({ userId });

    res.status(200).json({ addresses });
  } catch (err) {
    res.status(500).json({message: `Oops! An internal server error occurred. ${err.message}`});
  }
};

export default GetAddress;
