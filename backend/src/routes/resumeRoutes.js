const express = require('express');
const router = express.Router();
const { uploadResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, (req, res, next) => {
  upload.single('resume')(req, res, function (err) {
    if (err) {
      return next(err);
    }
    next();
  });
}, uploadResume);

module.exports = router;
