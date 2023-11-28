/* eslint-disable no-unused-vars */
import OrderModel from '../../models/order';
import ProductModel from '../../models/product';
import NotificationModel from '../../models/notification';
import ChargeCustomer from '../../utils/charge-customer';

const PlaceOrder = async (req, res) => {
  try {
    const {
      username,
      email,
      stripeId,
      cardStripeId,
      userId,
      products,
      orderSummary,
    } = req.body;

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

    await ChargeCustomer({
      totalAmount: orderSummary.total,
      email,
      stripeId,
      cardStripeId,
      orderId,
      cvc: 123,
    });

    const adminNotification = new NotificationModel({
      userId,
      text: `Order# ${orderId} has been placed`,
      isRead: false,
      forAdmin: true,
    });

    const userNotification = new NotificationModel({
      userId,
      text: `Order# ${orderId} has been placed`,
      isRead: false,
      forAdmin: false,
    });

    await userNotification.save();

    const savedNotification = await adminNotification.save();

    res.status(201).json(savedNotification);
    return;
  } catch (error) {
    console.error('Error placing order', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

function generateOrderId() {
  const timestamp = new Date().getTime();
  const uniqueId = Math.floor(100000 + Math.random() * 900000);
  const orderId = `${timestamp}${uniqueId}`.slice(0, 10); 
  return orderId;
}

export default PlaceOrder;
