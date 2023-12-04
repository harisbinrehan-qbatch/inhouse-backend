import OrderModel from '../../../models/order';

const SetStatusPaidOnChargeCustomer = async (req) => {

  const { orderId } = req.body.data.object.metadata;

  await OrderModel.updateOne(
      { orderId: orderId },
      { $set: { isPaid: true } }
    );

};

export default SetStatusPaidOnChargeCustomer;
