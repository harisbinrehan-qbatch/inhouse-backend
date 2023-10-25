import OrderModel from '../../models/order';

const GetAllOrders = async (req, res) => {
  try {
    // Retrieve all orders from the database
    const orders = await OrderModel.find();

    // Check if the number of orders found is 0
    if (orders.length === 0) {
      // Return a response with the message "no orders found"
      return res.status(404).json({
        message: 'No orders found.',
      });
    }

    // Return a response with the orders
    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: `Oops! An internal server error occurred: ${error.message}`,
    });
  }
};

export default GetAllOrders;
