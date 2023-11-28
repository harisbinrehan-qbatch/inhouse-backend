import productModel from '../../models/product';

const AddProduct = async (req, res) => {
  try {
    const images = [];

    if (!req.body.obj) {
      return res.status(400).json('Request body must contain obj field');
    }

    const { name, size, color, price, quantity } = req.body.obj;

    if (!name || !size || !color || !price || !quantity) {
      return res.status(400).json('All fields are required');
    }

    if (price <= 0) {
      return res.status(400).json('Price must be greater than zero');
    }

    if (quantity < 0 || quantity % 1 !== 0) {
      return res.status(400).json('Quantity must be a non-negative integer');
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
      images,
    });

    await newProduct.save();

    res.status(200).json('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json('Internal Server Error');
  }
};

export default AddProduct;
