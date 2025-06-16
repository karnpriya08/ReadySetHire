const multer = require('multer');
// Import path module to handle file extensions
const path = require('path');

// Define where and how uploaded files will be stored
const storage = multer.diskStorage({
    // Set destination 
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    // Rename the uploaded file to avoid conflict
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// to allow only specific file types
const fileFilter = (req, file, cb) => {

    const allowedTypes = /pdf|doc|docx/;
    // Check the file extension and MIME type
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb("Only pdf/doc/docx file allowed!");
    }
};

// Create multer upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;