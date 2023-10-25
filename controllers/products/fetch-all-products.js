import productModel from '../../models/product';

const getAllProducts = async (req, res) => {
  try {
    const { limit, skip, name } = req.query;
    const limitValue = parseInt(limit);
    const skipValue = parseInt(skip) || 0;
    console.log('bhjhsdfkjsdj', limit, skip, name);
    const selector = {};

    if (name) {
      const regex = new RegExp('^' + name, 'i');
      selector.name = { $regex: regex };
    }
    let products;
    if (limit) {
      products = await productModel
        .find(selector)
        .skip(skipValue)
        .limit(limitValue);
    }else{
        products = await productModel
        .find(selector)
    }

    // Check if the number of products found is 0
    if (products.length === 0) {
      // Return a response with the message "no products found"
      return res.status(404).json({
        message: 'No products found.',
      });
    }

    // Return a response with the products
    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: `Oops! An internal server error occurred.${error.message}`,
    });
  }
};

export default getAllProducts;
