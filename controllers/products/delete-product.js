import ProductModel from "../../models/product";

const DeleteProduct = async (req, res) => {
  try {
    const { _id } = req.query;
    const product = await ProductModel.deleteOne({ _id });

    if (product.deletedCount === 1) {
      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Product not found or deletion failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Oops! An internal server error occurred.${error.message}`,
    });
  }
};

export default DeleteProduct;
