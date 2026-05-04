const multer = require('multer');
const path = require('path');

// Set storage engine to memory
const storage = multer.memoryStorage();

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /pdf|docx/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF and DOCX files are allowed!'));
  }
}

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
