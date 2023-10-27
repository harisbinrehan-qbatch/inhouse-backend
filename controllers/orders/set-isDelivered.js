import OrderModel from '../../models/order';

const SetOrderAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.query;
    
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { isDelivered: true },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order has been marked as delivered',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order as delivered', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default SetOrderAsDelivered;
