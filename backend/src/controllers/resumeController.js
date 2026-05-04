const { parseResume } = require('../services/resumeParser.service');
const { parseResumeStructure } = require('../services/resumeSectionParser.service');
const path = require('path');

// @desc    Upload and parse resume
// @route   POST /api/resume/upload
// @access  Private
exports.uploadResume = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload a file',
    });
  }

  try {
    const filePath = path.join(__dirname, '../../uploads', req.file.filename);
    const result = await parseResume(filePath, req.file.mimetype);
    
    // Structure parsing
    const structuredData = parseResumeStructure(result.text);

    res.status(200).json({
      success: true,
      message: 'Resume uploaded and parsed successfully',
      data: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        text: result.text,
        wordCount: result.wordCount,
        ...structuredData
      },
    });
  } catch (err) {
    next(err);
  }
};
