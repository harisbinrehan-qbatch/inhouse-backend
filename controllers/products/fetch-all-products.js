import productModel from '../../models/product';

const getAllProducts = async (req, res) => {
  try {
    const { limit, skip, filterObject } = req.query;

    const limitValue = Number(limit) || 100;
    const skipValue = Number(skip) || 0;

    const selector = {};

    if (filterObject?.size && filterObject.size !== 'none') {
      selector.size = { $in: filterObject.size };
    }

    if (filterObject?.color && filterObject.color !== 'none') {
      selector.color = { $in: filterObject.color };
    }

    if (filterObject?.search) {
      selector.name = { $regex: new RegExp(filterObject.search, 'i') };
    }

    if (
      filterObject?.price &&
      filterObject.price[0] !== 'none' &&
      filterObject.price[1] !== 'none'
    ) {
      selector.price = {
        $gte: Number(filterObject.price[0]),
        $lte: Number(filterObject.price[1]),
      };
    }

    // Sort the products based on the "default sorting" value
    let sort = {};

    if (filterObject && filterObject['default sorting'] !== 'none') {
      if (filterObject['default sorting'] === 'Price low to high') {
        sort = { price: 1 };
      } else if (filterObject['default sorting'] === 'Price high to low') {
        sort = { price: -1 };
      } else if (filterObject['default sorting'] === 'Newest products') {
        sort = { date: -1 };
      }
    }

    const products = await productModel
      .find(selector)
      .sort(sort)
      .limit(limitValue)
      .skip(skipValue);

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({
      message: 'Oops! An internal server error occurred.',
    });
  }
};

export default getAllProducts;
