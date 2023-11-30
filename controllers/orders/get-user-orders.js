import OrderModel from '../../models/order';

const GetUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    const userOrders = await OrderModel.find({ userId: userId });

    return res.status(200).json(userOrders);
  } catch (error) {
    console.log('Error fetching user orders:', error);
    return res
      .status(400)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

export default GetUserOrders;
