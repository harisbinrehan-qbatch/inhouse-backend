import OrderModel from '../../models/order';
import ProductModel from '../../models/product';
import NotificationModel from '../../models/notification';

const PlaceOrder = async (req, res) => {
  try {
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
      try {
        const existingProduct = await ProductModel.findById(product._id);

        if (existingProduct) {
          const newQuantity = existingProduct.quantity - product.quantity;

          existingProduct.sold += product.quantity;
          existingProduct.quantity = newQuantity;

          await existingProduct.save();
        }
      } catch (error) {
        console.error(`Error updating product ${product._id}:`, error);
      }
    });

    await Promise.all(updateProductPromises);

    await newOrder.save();

    const newNotification = new NotificationModel({
      userId,
      text: `Order# ${orderId} has been placed`,
      isRead: false,
    });

    const savedNotification = await newNotification.save();

    res.status(201).json(savedNotification);
    return;
  } catch (error) {
    console.error('Error placing order', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

function generateOrderId() {
  const timestamp = new Date().getTime();
  const uniqueId = Math.floor(1000 + Math.random() * 9000);
  return `${timestamp}${uniqueId}`;
}

export default PlaceOrder;
