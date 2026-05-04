const ResumeCheck = require('../models/ResumeCheck');
const resumeParser = require('../services/resumeParser.service');
const resumeSectionParser = require('../services/resumeSectionParser.service');
const jdParser = require('../services/jdParser.service');
const matchingService = require('../services/matching.service');
const scoringService = require('../services/scoring.service');
const aiFeedbackService = require('../services/aiFeedback.service');
const path = require('path');
const fs = require('fs');

exports.analyzeResume = async (req, res, next) => {
  try {
    const { jobTitle, companyName, jobDescription } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a resume file' });
    }

    if (!jobTitle || !jobDescription) {
      // Clean up uploaded file if validation fails
      if (req.file.path) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: 'Job title and description are required' });
    }

    // 1. Extract resume text
    const { text: resumeText, wordCount } = await resumeParser.parseResume(req.file.path, req.file.mimetype);

    // 2. Parse resume sections
    const parsedResume = resumeSectionParser.parseResumeStructure(resumeText);
    // Add text to match what scoring service expects
    parsedResume.text = resumeText;

    // 3. Parse job description
    const jdData = jdParser.parseJD({ jobTitle, companyName, jobDescription });

    // 4. Match skills and keywords
    const matchingResult = matchingService.analyzeMatch(resumeText, jobDescription);

    // 5. Calculate ATS score
    const scoreData = scoringService.calculateFinalScore(
      resumeText,
      jobDescription,
      parsedResume,
      matchingResult
    );

    // 6. Generate formatting issues
    const formatIssues = [];
    if (wordCount < 300) formatIssues.push('Resume is too short (less than 300 words).');
    if (wordCount > 900) formatIssues.push('Resume is quite long (over 900 words), consider condensing it.');
    if (!/[-•●■▪◦]/.test(resumeText)) formatIssues.push('No bullet points detected. Use bullets for better readability.');
    if (/[^\n]{500,}/.test(resumeText)) formatIssues.push('Some paragraphs are very long. Break them into smaller chunks.');
    if (!parsedResume.checks.hasEmail) formatIssues.push('Email address not found.');
    if (!parsedResume.checks.hasPhone) formatIssues.push('Phone number not found.');

    // 7. Generate rule-based suggestions
    const suggestions = [];
    if (matchingResult.missingSkills.length > 0) {
      suggestions.push(`Try to incorporate these missing skills: ${matchingResult.missingSkills.slice(0, 5).join(', ')}.`);
    }
    if (matchingResult.missingKeywords.length > 0) {
      suggestions.push('Include more keywords from the job description to pass automated filters.');
    }
    if (!parsedResume.checks.hasLinkedIn) suggestions.push('Add your LinkedIn profile link to increase professional visibility.');
    if (!parsedResume.checks.hasGitHub) suggestions.push('Add a GitHub link if you have technical projects to showcase.');
    if (!parsedResume.checks.hasProjects) suggestions.push('Add a dedicated "Projects" section to showcase your practical experience.');
    if (scoreData.overallScore < 60) suggestions.push('Tailor your resume more closely to this specific job description to improve your score.');

    // 8. Generate AI Feedback (Optional/Parallel)
    const aiFeedback = await aiFeedbackService.getAiFeedback({
      resumeText,
      jobTitle,
      jobDescription,
      matchedSkills: matchingResult.matchedSkills,
      missingSkills: matchingResult.missingSkills,
      scoreBreakdown: scoreData.breakdown
    });

    // 9. Save report in MongoDB
    const resumeCheck = await ResumeCheck.create({
      userId: req.user._id,
      resumeFileName: req.file.originalname,
      resumeText: resumeText,
      jobTitle,
      companyName,
      jobDescription,
      score: scoreData,
      result: {
        matchedSkills: matchingResult.matchedSkills,
        missingSkills: matchingResult.missingSkills,
        matchedKeywords: matchingResult.matchedKeywords,
        missingKeywords: matchingResult.missingKeywords,
        formatIssues,
        sectionFeedback: parsedResume.checks,
        suggestions,
        aiFeedback // Store the AI generated content
      }
    });

    // 10. Return full report
    res.status(201).json({
      success: true,
      data: {
        id: resumeCheck._id,
        score: scoreData,
        result: {
          matchedSkills: matchingResult.matchedSkills,
          missingSkills: matchingResult.missingSkills,
          matchedKeywords: matchingResult.matchedKeywords,
          missingKeywords: matchingResult.missingKeywords,
          formatIssues,
          sectionFeedback: parsedResume.checks,
          suggestions,
          aiFeedback
        }
      }
    });

  } catch (error) {
    // Cleanup file if it still exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

exports.getCheckById = async (req, res, next) => {
  try {
    const check = await ResumeCheck.findOne({ _id: req.params.id, userId: req.user._id });
    if (!check) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.status(200).json({ success: true, data: check });
  } catch (error) {
    next(error);
  }
};

exports.getAllChecks = async (req, res, next) => {
  try {
    const checks = await ResumeCheck.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('jobTitle companyName score createdAt');
    res.status(200).json({ success: true, data: checks });
  } catch (error) {
    next(error);
  }
};

exports.deleteCheck = async (req, res, next) => {
  try {
    const check = await ResumeCheck.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!check) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    next(error);
  }
};
