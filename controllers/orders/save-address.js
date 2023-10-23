import AddressModel from '../../models/address';

const SaveAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const existingAddress = await AddressModel.findOne({ userId });

    if (existingAddress) {
      existingAddress.addresses.push(address);
      await existingAddress.save();
    } else {
      // User ID doesn't exist, create a new document
      const newAddress = new AddressModel({
        userId,
        addresses: [address],
      });
      await newAddress.save();
    }

    res.status(200).json({ message: 'Address has been saved successfully' });
  } catch (error) {
    console.error('Error saving address', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default SaveAddress;
