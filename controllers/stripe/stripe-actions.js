import CreateCustomer from './utils/create-customer';
import SetStatusPaidOnChargeCustomer from './utils/set-status-paid';

const StripeActions = async (req, res) => {
  try {
    if (req.body.type === 'customer.created') {
      await CreateCustomer(req);
    } else if (req.body.type === 'charge.succeeded') {
      await SetStatusPaidOnChargeCustomer(req);
    }

    res.status(200).json('OK');
  } catch (error) {
    console.error('Error in StripeActions:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

export default StripeActions;
