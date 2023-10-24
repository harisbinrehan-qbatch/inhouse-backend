import AddressModel from '../../models/address';

const SaveAddress = async (req, res) => {
  try {
    const { userId, ...addressInfo } = req.body;

    const existingAddress = await AddressModel.findOne({ userId });

    if (existingAddress) {
      const existingAddressInfo = existingAddress.addressInfo.find(
        (address) => JSON.stringify(address) === JSON.stringify(addressInfo)
      );

      if (!existingAddressInfo) {
        existingAddress.addressInfo.push(addressInfo);
        await existingAddress.save();
      }
    } else {
      const newAddress = new AddressModel({
        userId,
        addressInfo: [addressInfo],
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