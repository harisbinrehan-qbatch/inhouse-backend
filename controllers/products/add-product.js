import productModel from '../../models/product';

const AddProduct = async (req, res) => {
  try {
    const { name, size, color, price, quantity } = req.body;

    const newProduct = new productModel({
      name,
      size,
      color,
      price,
      quantity,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default AddProduct;
