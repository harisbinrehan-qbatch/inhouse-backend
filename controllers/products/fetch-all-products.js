import productModel from "../../models/product";

const getAllProducts = async (req, res) => {
  try {
    const { limit, skip, name } = req.query;
    const limitValue = parseInt(limit) || 10;
    const skipValue = parseInt(skip) || 0;

    const selector = {};

    if (name) {
      const regex = new RegExp("^" + name, "i");
      selector.name = { $regex: regex };
    }

    const products = await productModel
      .find(selector)
      .skip(skipValue)
      .limit(limitValue);

    // Check if the number of products found is 0
    if (products.length === 0) {
      // Return a response with the message "no products found"
      return res.status(200).json({
        message: "No products found.",
      });
    }

    // Return a response with the products
    res.status(200).json({
      products,
    });
  } catch (error) {
    // Send an internal server error response
    res.status(500).json({
      message: "Oops! An internal server error occurred.",
    });
  }
};

export default getAllProducts;
