import productModel from '../../models/product';

const EditProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productProps = req.body;

    const product = await productModel.findByIdAndUpdate(
      productId,
      productProps
    );

    if (!product) {
      return res.status(404).json({
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      message: 'Product updated successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while updating the product.',
    });
  }
};

export default EditProduct;
