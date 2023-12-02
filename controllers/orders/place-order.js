/* eslint-disable no-unused-vars */
import OrderModel from '../../models/order';
import ProductModel from '../../models/product';
import NotificationModel from '../../models/notification';
import ChargeCustomer from '../stripe/utils/charge-customer';
import generateOrderId from '../../utils/generate-order-id';

const PlaceOrder = async (req, res) => {
  try {
    const {
      username,
      email,
      stripeId,
      cardStripeId,
      userId,
      products,
      totalAmount,
    } = req.body;

    const orderId = generateOrderId();

    const newOrder = new OrderModel({
      orderId,
      username,
      userId,
      products,
      totalProducts: products.length,
      total: totalAmount,
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
        throw error; // Re-throw the error to stop the execution if there's an issue
      }
    });

    await Promise.all(updateProductPromises);

    await newOrder.save();

    await ChargeCustomer({
      totalAmount: Math.round(totalAmount),
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

    res.status(200).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
    console.error('Error in PlaceOrder:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default PlaceOrder;
