import ProductModel from '../../models/product';

const DeleteProduct = async (req, res) => {
  try {
    const { _id } = req.query;

    const deletionResult = await ProductModel.deleteOne({ _id });

    if (deletionResult.deletedCount === 1) {
      return res.status(200).json({
        message: 'Success: Product deleted successfully',
      });
    } else {
      return res.status(404).json({
        message: 'Not Found: Product not found or deletion failed.',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: Oops! An internal server error occurred. ${error.message}`,
    });
  }
};

export default DeleteProduct;
