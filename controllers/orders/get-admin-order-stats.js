import OrderModel from '../../models/order';

const GetAdminOrderStats = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    const units = orders.reduce((total, order) => total + order.products.length, 0);
    
    const amount = orders.reduce((total, order) => total + parseFloat(order.total), 0);

    return res.status(200).json({
      totalOrders: orders.length,
      totalUnits: units,
      totalAmount: amount,
    });
  } catch (error) {
     console.error("Error getting admin order stats", error);
    res.status(500).json({
      message: `Oops! An internal server error occurred: ${error.message}`,
    });
  }
};

export default GetAdminOrderStats;
