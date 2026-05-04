const scoringService = require('../services/scoring.service');

exports.calculateScore = async (req, res, next) => {
  try {
    const { resumeText, jobDescription, parsedResume, matchingResult } = req.body;

    const scoreData = scoringService.calculateFinalScore(
      resumeText,
      jobDescription,
      parsedResume,
      matchingResult
    );

    res.status(200).json({
      success: true,
      data: scoreData
    });
  } catch (error) {
    next(error);
  }
};
