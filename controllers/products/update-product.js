import productModel from '../../models/product';

const UpdateProduct = async (req, res) => {
  try {
    const { _id, ...productData } = req.body;

    const existingProduct = await productModel.findById(_id);

    if (!existingProduct) {
      return res.status(404).json({
        message: 'Not Found: Product not found.',
      });
    }

    if (productData.name !== '') {
      existingProduct.name = productData.name;
    }

    if (productData.size !== '') {
      existingProduct.size = productData.size;
    }

    if (productData.price !== '') {
      existingProduct.price = productData.price;
    }

    if (productData.color !== '') {
      existingProduct.color = productData.color;
    }

    if (productData.quantity !== '') {
      existingProduct.quantity = productData.quantity;
    }

    await existingProduct.save();

    const allProducts = await productModel.find({});

    return res.status(200).json({
      message: 'Success: Product updated successfully.',
      products: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: Oops! An internal server error occurred. ${error.message}`,
    });
  }
};

export default UpdateProduct;
