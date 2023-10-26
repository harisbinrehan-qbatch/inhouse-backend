import OrderModel from '../../models/order';

const GetAllOrders = async (req, res) => {
  try {
    const { orderId } = req.query;
    let searchedOrders = [];
    const results = [];

    const orders = await OrderModel.find();

    if (orders.length > 0) {
      results.push(...orders);
    }
    if (orderId) {
      const regex = new RegExp(orderId, 'i');
      searchedOrders = await OrderModel.find({
        orderId: { $regex: regex },
      });

      if (searchedOrders.length > 0) {
        console.log('IMPORTANT ');
        searchedOrders.push(...searchedOrders);
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: 'No orders found.',
          searchedOrders: null,
        });
      }
    }
    return res.status(200).json({
      searchedOrders: searchedOrders.length > 0 ? searchedOrders : null,
      orders: results,
    });
  } catch (error) {
    res.status(500).json({
      message: `Oops! An internal server error occurred: ${error.message}`,
    });
  }
};

export default GetAllOrders;
