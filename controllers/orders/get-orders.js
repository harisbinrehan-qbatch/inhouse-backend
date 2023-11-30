import OrderModel from '../../models/order';

const GetAllOrders = async (req, res) => {
  try {
    const { limit, skip, orderId } = req.query;

    const limitValue = orderId ? undefined : Number(limit);
    const skipValue = orderId ? undefined : Number(skip);

    let query = {};

    if (orderId) {
      const regex = new RegExp(orderId, 'i');
      query = { orderId: regex };
    }

    const orders = await OrderModel.find(query)
      .skip(skipValue)
      .limit(limitValue);

    const totalCount = await OrderModel.countDocuments(query);

    if (orders.length === 0) {
      return res.status(404).json({
        message: 'No orders found.',
        searchedOrders: null,
      });
    }

    return res.status(200).json({
      orders: orders,
      totalCount: totalCount,
    });
  } catch (error) {
    res.status(500).json({
      message: `Oops! An internal server error occurred: ${error.message}`,
    });
  }
};

export default GetAllOrders;
