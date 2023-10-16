import productModel from "../../models/product";

export const getAllProducts = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const limitValue = parseInt(limit) || 10;
    const skipValue = parseInt(skip) || 0;

    const products = await productModel
      .find({})
      .skip(skipValue)
      .limit(limitValue);

    res.status(200).json({
      products: products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default getAllProducts;
