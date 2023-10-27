import OrderModel from '../../models/order';

const PlaceOrder = async (req, res) => {
  try {
    const { username, userId, products, orderSummary } = req.body;

    

    const orderId = generateOrderId();

    const newOrder = new OrderModel({
      orderId,
      username,
      userId,
      products,
      totalProducts: products.length, // Store the total number of products
      total: orderSummary.total,
    });

    console.log('New Order', newOrder);

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
