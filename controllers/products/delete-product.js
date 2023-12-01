import ProductModel from '../../models/product';

const DeleteProduct = async (req, res) => {
  try {
    const { _id } = req.query;

    const deletionResult = await ProductModel.deleteOne({ _id });

    if (deletionResult.deletedCount === 1) {

      return res.status(200).json({
        message: 'Product deleted successfully',
      });
    } else {
      return res.status(401).json({
        message: 'Product not found or deletion failed.',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `Oops! An internal server error occurred.${error.message}`,
    });
  }
};

export default DeleteProduct;
