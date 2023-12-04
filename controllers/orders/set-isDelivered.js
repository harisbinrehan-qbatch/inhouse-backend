import NotificationModel from '../../models/notification';
import OrderModel from '../../models/order';

const SetOrderAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.query;

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { userId } = order;

    const updatedOrderId = order.orderId;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { isDelivered: true },
      { new: true }
    );

    const newNotification = new NotificationModel({
      userId,
      text: `Order# ${updatedOrderId} has been delivered`,
      isRead: false,
      forAdmin: false
    });

    await newNotification.save();

    res.status(200).json({
      message: 'Order has been marked as delivered',
      order: updatedOrder
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default SetOrderAsDelivered;
