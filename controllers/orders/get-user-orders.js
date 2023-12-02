import OrderModel from '../../models/order';

const GetUserOrders = async (req, res) => {
  try {
    const { userId, skip, limit } = req.query;

    const limitValue = Number(limit) || 0;
    const skipValue = Number(skip) || 0;

    const orders = await OrderModel.find({ userId: userId })
      .skip(skipValue)
      .limit(limitValue);

    const totalCount = await OrderModel.countDocuments({ userId: userId });

    return res.status(200).json({
      orders,
      totalCount,
    });
  } catch (error) {
    return res.status(400).json({ message: 'Internal Server Error' });
  }
};

export default GetUserOrders;
