import OrderModel from '../../models/order';

const PlaceOrder = async (req, res) => {
  try {
    const { username, userId, products, orderSummary } = req.body;

    console.log('In backend with data', req.body);

    // Generate a unique order ID (you can customize this as needed)
    const orderId = generateOrderId();

    const newOrder = new OrderModel({
      orderId,
      username,
      userId,
      products,
      subTotal: orderSummary.subTotal,
      tax: orderSummary.tax,
      total: orderSummary.total,
    });

    await newOrder.save();

    res
      .status(200)
      .json({ message: 'Your order has been placed successfully', orderId });
  } catch (error) {
    console.error('Error placing order', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

function generateOrderId() {
  const orderId = Math.floor(100000000 + Math.random() * 900000000);
  return orderId.toString();
}

export default PlaceOrder;
