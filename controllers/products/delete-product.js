import ProductModel from '../../models/product';

const DeleteProduct = async (req, res) => {
  try {
    const { _id } = req.query;

    const deletionResult = await ProductModel.deleteOne({ _id });

    if (deletionResult.deletedCount === 1) {
      const allProducts = await ProductModel.find({});

      return res.status(200).json({
        message: 'Product deleted successfully',
        products: allProducts, 
      });
    } else {
      return res.status(404).json({
        message: 'Product not found or deletion failed.',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Oops! An internal server error occurred.${error.message}`,
    });
  }
};

export default DeleteProduct;
