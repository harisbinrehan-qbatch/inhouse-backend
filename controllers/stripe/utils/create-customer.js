import userModel from '../../../models/user';

const CreateCustomer = async (req) => {
  const { email, id } = req.body.data.object;

  await userModel.updateOne({ email }, { $set: { stripeId: id } });
};

export default CreateCustomer;
