import OrderModel from '../../models/order';

const PlaceOrder = async (req, res) => {
try {
    const { userId, products, orderSummary } = req.body;


    // console.log('In backend with data', req.body);
const newOrder = new OrderModel({
    userId,
    products,
    subTotal: orderSummary.subTotal,
    tax: orderSummary.tax,
    total: orderSummary.total,
    });

    await newOrder.save();

    res
    .status(200)
    .json({ message: 'Your order has been placed successfully' });
} catch (error) {
    console.error('Error placing order', error);
    res.status(500).json({ message: 'Internal Server Error' });
}
};

export default PlaceOrder;
