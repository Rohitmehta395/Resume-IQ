const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { parseJobDescription } = require('../controllers/jdController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');

router.post(
  '/parse', 
  protect,
  [
    check('jobTitle', 'Job title is required').not().isEmpty(),
    check('jobDescription', 'Job description is required').not().isEmpty(),
    validate
  ],
  parseJobDescription
);

module.exports = router;
