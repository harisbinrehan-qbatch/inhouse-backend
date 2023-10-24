import AddressModel from '../../models/address';

const GetAddress = async (req, res) => {
  try {
    const { userId } = req.query;

    const addresses = await AddressModel.find({ userId });

    res.status(200).json({ addresses });
  } catch (error) {
    console.error('Error retrieving addresses', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default GetAddress;
