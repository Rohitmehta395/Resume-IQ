const mongoose = require('mongoose');

const ResumeCheckSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resumeFileName: {
    type: String,
    required: true
  },
  resumeText: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String
  },
  jobDescription: {
    type: String,
    required: true
  },
  score: {
    overallScore: Number,
    breakdown: {
      keywordScore: Number,
      skillScore: Number,
      experienceScore: Number,
      formatScore: Number,
      sectionScore: Number,
      contactScore: Number
    }
  },
  result: {
    matchedSkills: [String],
    missingSkills: [String],
    matchedKeywords: [String],
    missingKeywords: [String],
    formatIssues: [String],
    sectionFeedback: mongoose.Schema.Types.Mixed,
    suggestions: [String],
    aiFeedback: {
      overallFeedback: String,
      topIssues: [String],
      sectionFeedback: {
        summary: String,
        skills: String,
        experience: String,
        projects: String,
        education: String
      },
      rewriteSuggestions: [{
        original: String,
        improved: String,
        reason: String
      }],
      isAiGenerated: {
        type: Boolean,
        default: false
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ResumeCheck', ResumeCheckSchema);
