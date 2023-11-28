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

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { isDelivered: true },
      { new: true }
    );

    // Create and save a notification for the user
    const newNotification = new NotificationModel({
      userId,
      text: `Order# ${orderId} has been delivered`,
      isRead: false,
      forAdmin: false,
    });

   const result =  await newNotification.save();
   console.log({ result });

    // Respond with information about the updated order
    res.status(200).json({
      message: 'Order has been marked as delivered',
      order: updatedOrder,
    });

    // Alternatively, respond with information about the saved notification
    // res.status(201).json(savedNotification);
  } catch (error) {
    console.error('Error updating order as delivered', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default SetOrderAsDelivered;
