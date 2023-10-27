import AddressModel from '../../models/address';

const UpdateDefaultAddress = async (req, res) => {
  try {
    const { userId, index } = req.body;
    
    const existingAddress = await AddressModel.findOne({ userId });

    if (existingAddress) {
      existingAddress.addressInfo.forEach((address, i) => {
        if (i === index) {
          address.isDefault = true;
        } else {
          address.isDefault = false;
        }
      });

      await existingAddress.save();
    } else {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Default address has been updated successfully' });
  } catch (error) {
    console.error('Error updating default address', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default UpdateDefaultAddress;


