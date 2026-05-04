const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const scoreController = require('../controllers/scoreController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');

router.post(
  '/calculate', 
  protect,
  [
    check('resumeText', 'Resume text is required').not().isEmpty(),
    check('jobDescription', 'Job description is required').not().isEmpty(),
    check('parsedResume', 'Parsed resume data is required').not().isEmpty(),
    check('matchingResult', 'Matching result is required').not().isEmpty(),
    validate
  ],
  scoreController.calculateScore
);

module.exports = router;
