import productModel from '../../models/product';

const SearchProducts = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        message:
          'Bad Request: Name parameter is required for searching products.'
      });
    }

    const regex = new RegExp('^' + name, 'i');

    const products = await productModel.find({ name: { $regex: regex } });

    res.status(200).json({ products });
  } catch (err) {
    res
      .status(500)
      .json({message: `Oops! An internal server error occurred. ${err.message}`});
  }
};

export default SearchProducts;
