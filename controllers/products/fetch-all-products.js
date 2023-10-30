/* eslint-disable no-unused-vars */
import productModel from '../../models/product';

const getAllProducts = async (req, res) => {
  try {
    const { limit, skip, name, filterObject, search } = req.query;

    const limitValue = parseInt(limit) || 100;
    const skipValue = parseInt(skip) || 0;
    let selector = {};

    if (filterObject?.price) {
      selector = {
        ...filterObject,
        price: {
          $gte: Number(filterObject.price[0]),
          $lte: Number(filterObject.price[1]),
        },
      };
    } else {
      selector = { ...filterObject };
    }
    if (search) {
      const regex = new RegExp('^' + search, 'i');
      selector.name = { $regex: regex };
    }

    const products = await productModel
      .find(selector)
      .limit(limitValue)
      .skip(skipValue);

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
