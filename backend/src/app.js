const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

const path = require('path');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(helmet());

// Improved CORS configuration
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173'];
console.log('Allowed Origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      console.error(`CORS Rejected: Origin "${origin}" not in allowed origins:`, allowedOrigins);
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "ATS Checker API is running"
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/job-description', require('./routes/jdRoutes'));
app.use('/api/match', require('./routes/matchRoutes'));
app.use('/api/score', require('./routes/scoreRoutes'));
app.use('/api/checks', require('./routes/checkRoutes'));

const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
