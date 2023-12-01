const EditPaymentDetails = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    console.log('Error saving or updating payment details', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default EditPaymentDetails;
