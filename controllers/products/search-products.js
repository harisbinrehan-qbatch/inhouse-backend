import productModel from '../../models/product';

const SearchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(404).json({
        message: 'Name parameter is required for searching products.',
      });
    }

    const regex = new RegExp('^' + name, 'i');

    const products = await productModel.find({
      name: { $regex: regex },
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default SearchProducts;
