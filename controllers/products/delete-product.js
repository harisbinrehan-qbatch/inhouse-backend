import ProductModel from '../../models/product';

const DeleteProduct = async (req, res) => {
  try {
    const {_id} = req.query;
    const product = await ProductModel.findOne({ _id });

    if (product.deletedCount === 1) {
      res.status(200).json('Product deleted successfully');
    } else {
      res.status(404).json('Product Not Found or Deletion Failed');
    }
  } catch (error) {
    console.error('Error in Deleting Product:', error);
    res
      .status(500)
      .json({
        error: `Internal server error in deleting products ${error.message}`,
      });
  }
};

export default DeleteProduct ;
