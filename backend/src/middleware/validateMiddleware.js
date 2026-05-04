const { validationResult } = require('express-validator');

/**
 * Middleware to handle validation results
 * Returns 400 with consistent error format if validation fails
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg, // Return the first error message
      errors: errors.array()
    });
  }
  next();
};

module.exports = { validate };
