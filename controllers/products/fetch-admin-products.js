import productModel from '../../models/product';
import catchResponse from '../../utils/catch-response';

const fetchAdminProducts = async (req, res) => {
  try {
    const { limit, skip, filterObject } = req.query;
    console.log('fetchAdminProducts ??', req.query);
    const limitValue = Number(limit);
    const skipValue = Number(skip);

    const selector = {};

    if (filterObject?.search) {
      selector.name = { $regex: new RegExp(filterObject.search, 'i') };
    }

    const totalCount = await productModel.countDocuments(selector);

    console.log('Total documents are', totalCount);

    const products = await productModel
      .find(selector)
      .limit(limitValue)
      .skip(skipValue);

    res.status(200).json({
      products,
      totalCount,
    });
  } catch (error) {
    error.statusCode = 401;
    catchResponse({ res, err: error });
  }
};

export default fetchAdminProducts;
