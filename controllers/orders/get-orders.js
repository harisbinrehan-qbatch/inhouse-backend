import OrderModel from '../../models/order';

const GetAllOrders = async (req, res) => {
  try {
    const { orderId } = req.query;
    let results = [];

    const orders = await OrderModel.find();

    if (orderId) {
      const regex = new RegExp(orderId, 'i');
      const searchedOrders = orders.filter((order) =>
        regex.test(order.orderId)
      );

      if (searchedOrders.length === 0) {
        return res.status(404).json({
          message: 'No orders found.',
          searchedOrders: null,
        });
      }

      results = searchedOrders;
    } else {
      results = orders;
    }

    return res.status(200).json({
      orders: results,
    });
  } catch (error) {
    res.status(500).json({
      message: `Oops! An internal server error occurred: ${error.message}`,
    });
  }
};

export default GetAllOrders;
