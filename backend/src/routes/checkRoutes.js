const express = require('express');
const router = express.Router();
const checkController = require('../controllers/checkController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { check } = require('express-validator');
const { validate } = require('../middleware/validateMiddleware');

router.post(
  '/analyze', 
  protect, 
  upload.single('resume'), 
  [
    check('jobTitle', 'Job title is required').not().isEmpty(),
    check('jobDescription', 'Job description is required').not().isEmpty(),
    validate
  ],
  checkController.analyzeResume
);
router.get('/', protect, checkController.getAllChecks);
router.get('/:id', protect, checkController.getCheckById);
router.delete('/:id', protect, checkController.deleteCheck);

module.exports = router;
