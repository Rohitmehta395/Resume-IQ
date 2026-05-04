const { parseJD } = require('../services/jdParser.service');

// @desc    Parse job description
// @route   POST /api/job-description/parse
// @access  Private
exports.parseJobDescription = async (req, res, next) => {
  try {
    const parsedData = parseJD(req.body);

    res.status(200).json({
      success: true,
      data: parsedData
    });
  } catch (err) {
    next(err);
  }
};
