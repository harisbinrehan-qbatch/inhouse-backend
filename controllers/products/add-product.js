import productModel from '../../models/product';

const AddProduct = async (req, res) => {
  try {
    const images = [];

    if (!req.body.obj) {
      // Changed status code from 422 to 400 for more accurate response
      return res
        .status(400)
        .json({ message: 'Bad Request: Request body must contain obj field' });
    }

    const {
 name, size, color, price, quantity
} = req.body.obj;

    if (!name || !size || !color || !price || !quantity) {
      // Changed status code from 422 to 400 for more accurate response
      return res
        .status(400)
        .json({ message: 'Bad Request: All fields are required' });
    }

    if (price <= 0) {
      // Changed status code from 422 to 400 for more accurate response
      return res
        .status(400)
        .json({ message: 'Bad Request: Price must be greater than zero' });
    }

    if (quantity < 0 || quantity % 1 !== 0) {
      // Changed status code from 422 to 400 for more accurate response
      return res
        .status(400)
        .json({message: 'Bad Request: Quantity must be a non-negative integer'});
    }

    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((singleFile) => {
        if (singleFile.path) {
          images.push(singleFile.filename);
        }
      });
    }

    const newProduct = new productModel({
      name,
      size,
      color,
      price,
      quantity,
      images
    });

    await newProduct.save();

    // Changed status code from 200 to 201 for successful resource creation
    res.status(201).json({ message: 'Created: Product added successfully' });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          'Internal Server Error: Oops! An internal server error occurred.'
      });
  }
};

export default AddProduct;
