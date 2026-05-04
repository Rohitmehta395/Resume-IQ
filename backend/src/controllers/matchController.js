const { analyzeMatch } = require('../services/matching.service');

// @desc    Analyze match between resume and job description
// @route   POST /api/match/analyze
// @access  Private
exports.analyzeResumeMatch = async (req, res, next) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const analysis = analyzeMatch(resumeText, jobDescription);

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (err) {
    next(err);
  }
};
