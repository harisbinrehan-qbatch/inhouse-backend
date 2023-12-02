import ProductModel from '../../models/product';

const AddBulkProducts = async (req, res) => {
  try {
    const productsData = req.body.bulkProducts;
    const errorArr = [];
    let writeData = [];
    let successfulUploads = 0;
    let failedUploads = 0;
    let failedIndices = [];

    for (let i = 0; i < productsData.length; i += 1) {
      const [name, size, color, price, quantity, date, images] =
        productsData[i];

      // Create an array to store the names of missing fields
      const missingFields = [];

      if (!name) missingFields.push('Name');
      if (!size) missingFields.push('Size');
      if (!color) missingFields.push('Color');
      if (!quantity) missingFields.push('Quantity');
      if (!price) missingFields.push('Price');
      if (!date) missingFields.push('Date');
      if (!images) missingFields.push('Images');

      if (missingFields.length > 0) {
        errorArr.push({
          row: i,
          message: `Missing fields: ${missingFields.join(
            ', '
          )}`,
        });
        failedUploads++;
        failedIndices.push(i);
        continue; 
      }

      const productPrice = parseInt(price, 10);
      const productStock = parseInt(quantity, 10);
      const productDate = new Date(date);
      const imageArray = images.split('\r\n').filter(Boolean);

      if (productStock < 0 || productPrice < 0) {
        errorArr.push({
          row: i,
          message: 'Product Stock or Price cannot be negative',
        });
        failedUploads++;
        failedIndices.push(i);
        continue; // Skip to the next iteration if there's a negative stock or price
      }

      writeData.push({
        insertOne: {
          document: {
            name,
            size,
            color,
            quantity,
            price,
            date: productDate,
            sold: 0,
            images: imageArray,
          },
        },
      });

      successfulUploads++;

      if (writeData.length >= 2) {
        try {
          await ProductModel.bulkWrite(writeData);
        } catch (err) {
          // Handle bulk write errors if needed
          console.error('Bulk write error:', err);
        }
        writeData = [];
      }
    }

    if (writeData.length) {
      try {
        await ProductModel.bulkWrite(writeData);
      } catch (err) {
        // Handle bulk write errors if needed
        console.error('Bulk write error:', err);
      }
    }

    const bulkUploadResult = {
      errorArr,
      successfulUploads,
      failedUploads,
      failedIndices,
    };

    return res.status(200).send({ bulkUploadResult });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default AddBulkProducts;