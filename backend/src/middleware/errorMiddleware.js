/**
 * Centralized Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[Error] ${err.name || 'Error'}: ${err.message}`);
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      console.error(err.stack);
    }
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // Multer error - File too large
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File too large. Maximum size allowed is 5MB.';
    error = { message, statusCode: 400 };
  }

  // Multer error - Too many files
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Invalid file upload. Only one file is allowed.';
    error = { message, statusCode: 400 };
  }

  // JSON Web Token errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again.';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired. Please log in again.';
    error = { message, statusCode: 401 };
  }

  // OpenAI / AI API errors
  if (err.status === 401 && err.type === 'invalid_api_key') {
    const message = 'AI Service configuration error. Please contact admin.';
    error = { message, statusCode: 500 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });
};

/**
 * 404 Not Found Middleware
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found - ${req.originalUrl}`
  });
};

module.exports = {
  errorHandler,
  notFound
};
