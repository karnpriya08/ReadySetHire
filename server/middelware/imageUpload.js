const multer = require('multer');
const path = require('path');

// Define the storage location where to save upload file 
const imageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/profileImages');
  },
  // set file name to avoid conflicts 
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to accept only image files
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  // checking file extension 
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

// Initialize multer with the storage and file filter
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 500 * 1024 * 1024 }
});

module.exports = uploadImage;