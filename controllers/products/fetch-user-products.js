import productModel from '../../models/product';
import catchResponse from '../../utils/catch-response';

const getAllProducts = async (req, res) => {
  try {
    const { filterObject } = req.query;


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

    let sort = {};

    if (filterObject && filterObject.sorting !== 'none') {
      if (filterObject.sorting === 'Price low to high') {
        sort = { price: 1 };
      } else if (filterObject.sorting === 'Price high to low') {
        sort = { price: -1 };
      } else if (filterObject.sorting === 'Newest products') {
        sort = { date: -1 };
      }
    }

    const products = await productModel
      .find(selector)
      .sort(sort)

     res.status(200).json({
      products,
    });
  } catch (error) {
    error.statusCode = 401;
    catchResponse({ res, err: error });
  }
  
};

export default getAllProducts;
