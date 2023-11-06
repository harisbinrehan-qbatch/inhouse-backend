import OrderModel from '../../models/order';
import ProductModel from '../../models/product';

const PlaceOrder = async (req, res) => {
  try {
    console.log('bjhagkjrhjsnfkslme', req.body)
    const { username, userId, products, orderSummary } = req.body;

    const orderId = generateOrderId();

    const newOrder = new OrderModel({
      orderId,
      username,
      userId,
      products,
      totalProducts: products.length,
      total: orderSummary.total,
    });

    const updateProductPromises = products.map(async (product) => {
      const existingProduct = await ProductModel.findById(product._id);

      if (existingProduct) {
        const newQuantity = existingProduct.quantity - product.quantity;

        existingProduct.sold += product.quantity;

        existingProduct.quantity = newQuantity;

        await existingProduct.save();
      }
    });

    await Promise.all(updateProductPromises);

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
