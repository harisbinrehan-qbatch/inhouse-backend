import multer from 'multer';

const multerConfig = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname);
    },
  });

  return multer({ storage: storage });
};

export default multerConfig;
