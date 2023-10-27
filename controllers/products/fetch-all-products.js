/* eslint-disable no-unused-vars */
import productModel from '../../models/product';

const getAllProducts = async (req, res) => {
  try {
    const { limit, skip, name, filterObject, search } = req.query;
    // console.log('filter object isss  ', search);

    const limitValue = parseInt(limit) ||100;
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
    //  console.log('selector  ,', selector);
                const products = await productModel.find(selector).limit(limitValue).
                skip(skipValue);

          res.status(200).json({
            products,
          });


    // if (name) {
    //   const regex = new RegExp('^' + name, 'i');
    //   selector.name = { $regex: regex };
    //   selector.filterObject = filterObject;
    // }
    // let products;
    // if (limit) {
    //   products = await productModel
    //     .find(selector)
    //     .skip(skipValue)
    //     .limit(limitValue);
    // } else {
    //   products = await productModel.find(selector);
    // }

    // // Check if the number of products found is 0
    // if (products.length === 0) {
    //   // Return a response with the message "no products found"
    //   return res.status(404).json({
    //     message: 'No products found.',
    //   });
   // }

    // Return a response with the products
    // res.status(200).json({
    //   products,
    // });
  } catch (error) {
    res.status(500).json({
      message: `Oops! An internal server error occurred.${error.message}`,
    });
  }
};

export default getAllProducts;
