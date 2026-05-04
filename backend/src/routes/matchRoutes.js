const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { analyzeResumeMatch } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');

router.post(
  '/analyze', 
  protect,
  [
    check('resumeText', 'Resume text is required').not().isEmpty(),
    check('jobDescription', 'Job description is required').not().isEmpty(),
    validate
  ],
  analyzeResumeMatch
);

module.exports = router;
