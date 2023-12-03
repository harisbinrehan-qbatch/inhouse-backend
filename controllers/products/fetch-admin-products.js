import productModel from '../../models/product';

const FetchAdminProducts = async (req, res) => {
  try {
    const { limit, skip, filterObject } = req.query;

    const limitValue = Number(limit) || 0;
    const skipValue = Number(skip) || 0;

    const selector = {};

    if (filterObject?.search) {
      selector.name = { $regex: new RegExp(filterObject.search, 'i') };
    }

    const totalCount = await productModel.countDocuments(selector);

    const products = await productModel
      .find(selector)
      .limit(limitValue)
      .skip(skipValue);

    res.status(200).json({
      products,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({
      message:
        'Internal Server Error: Oops! An internal server error occurred. Please try again later.',
    });
  }
};

export default FetchAdminProducts;
