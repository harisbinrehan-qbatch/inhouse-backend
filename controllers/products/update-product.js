import fs from 'fs';

import productModel from '../../models/product';

const UpdateProduct = async (req, res) => {
  try {
    const { _id, ...productData } = req.body.obj;

    const images = [];

    const existingProduct = await productModel.findById(_id);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Not Found: Product not found.' });
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

    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((singleFile) => {
        if (singleFile.path) {
          images.push(singleFile.filename);
        }
      });
    }

    if (req.files.length) {
      existingProduct.images.forEach((img)=>{
        const filePath = `uploads/${img}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`\n\n Error Deleting File: ${img}`);
          }
        });
      })
      images.forEach(singleImage => {
        if(typeof singleImage !== 'string') {

          existingProduct.images.push(singleImage);
        }
      })
    }

    await existingProduct.save();

    const allProducts = await productModel.find({});

    return res.status(200).json({
      message: 'Success: Product updated successfully.',
      products: allProducts
    });
  } catch (err) {
    res.status(500).json({message: `Oops! An internal server error occurred. ${err.message}`});
  }
};

export default UpdateProduct;
