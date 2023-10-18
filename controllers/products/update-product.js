import productModel from '../../models/product';

const UpdateProduct = async (req, res) => {
  try {
    const { _id, ...productData } = req.body;
    console.log('The id is', _id, req.body);
    const product = await productModel.findByIdAndUpdate({ _id }, productData);

    if (product === null) {
      return res.status(404).json({
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      message: 'Product updated successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: `Oops! An internal server error occurred.${error.message}`,
    });
  }
};

export default UpdateProduct;
