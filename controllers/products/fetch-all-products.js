import productModel from '../../models/product';

const getAllProducts = async (req, res) => {
  try {
    const { limit, skip, name } = req.query;
    const limitValue = parseInt(limit) || 10;
    const skipValue = parseInt(skip) || 0;

    const selector = {};
    
    if (name){
      const regex = new RegExp('^' + name, 'i');
      selector.name = { $regex: regex };
    }

    const products = await productModel
      .find(selector)
      .skip(skipValue)
      .limit(limitValue);

    res.status(200).json({
      products: products,
    });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export default getAllProducts;
