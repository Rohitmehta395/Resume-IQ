/**
 * Scoring Service
 * Provides deterministic rule-based ATS scoring
 */

const calculateKeywordScore = (matchingResult) => {
  if (!matchingResult || !matchingResult.matchedKeywords || !matchingResult.missingKeywords) return 0;
  const total = matchingResult.matchedKeywords.length + matchingResult.missingKeywords.length;
  if (total === 0) return 0;
  return Math.round((matchingResult.matchedKeywords.length / total) * 100);
};

const calculateSkillScore = (matchingResult) => {
  if (!matchingResult || !matchingResult.matchedSkills || !matchingResult.missingSkills) return 0;
  const total = matchingResult.matchedSkills.length + matchingResult.missingSkills.length;
  if (total === 0) return 0;
  return Math.round((matchingResult.matchedSkills.length / total) * 100);
};

const calculateExperienceScore = (parsedResume, jobDescription) => {
  // Experience relevance: Simple check for years of experience or related keywords
  // Since we don't have full entity extraction yet, we check for 'experience' section length 
  // and keyword matches in the experience section if possible.
  // For now, we'll base it on the ratio of experience keywords in the resume.
  if (!parsedResume || !parsedResume.text) return 0;
  const text = parsedResume.text.toLowerCase();
  const experienceKeywords = ['experience', 'work', 'history', 'professional', 'employment', 'background', 'role', 'responsibility'];
  const matches = experienceKeywords.filter(kw => text.includes(kw));
  return Math.round((matches.length / experienceKeywords.length) * 100);
};

const calculateFormatScore = (resumeText) => {
  if (!resumeText) return 0;
  let score = 100;

  // Word count check (300-900)
  const wordCount = resumeText.split(/\s+/).filter(w => w.length > 0).length;
  if (wordCount < 300 || wordCount > 900) score -= 20;

  // Bullet points check
  const hasBullets = /[-•●■▪◦]/.test(resumeText);
  if (!hasBullets) score -= 20;

  // Long paragraphs check (more than 500 chars without a newline)
  const hasLongParagraphs = /[^\n]{500,}/.test(resumeText);
  if (hasLongParagraphs) score -= 20;

  // Excessive special characters check (more than 5% of text)
  const specialChars = resumeText.replace(/[\w\s]/g, '').length;
  if (specialChars / resumeText.length > 0.05) score -= 20;

  return Math.max(0, score);
};

const calculateSectionScore = (parsedResume) => {
  if (!parsedResume || !parsedResume.sections) return 0;
  const requiredSections = ['skills', 'experience', 'projects', 'education', 'summary'];
  let found = 0;
  requiredSections.forEach(section => {
    if (parsedResume.sections[section] && parsedResume.sections[section].length > 10) {
      found++;
    }
  });
  return Math.round((found / requiredSections.length) * 100);
};

const calculateContactScore = (parsedResume) => {
  if (!parsedResume || !parsedResume.contact || !parsedResume.checks) return 0;
  const items = ['hasEmail', 'hasPhone', 'hasLinkedIn', 'hasGitHub'];
  let found = 0;
  items.forEach(item => {
    if (parsedResume.checks[item]) found++;
  });
  return Math.round((found / items.length) * 100);
};

exports.calculateFinalScore = (resumeText, jobDescription, parsedResume, matchingResult) => {
  const keywordScore = calculateKeywordScore(matchingResult);
  const skillScore = calculateSkillScore(matchingResult);
  const experienceScore = calculateExperienceScore(parsedResume, jobDescription);
  const formatScore = calculateFormatScore(resumeText);
  const sectionScore = calculateSectionScore(parsedResume);
  const contactScore = calculateContactScore(parsedResume);

  // Weights:
  // Keyword match: 35%
  // Skills match: 20%
  // Experience relevance: 15%
  // Resume formatting: 15%
  // Section completeness: 10%
  // Contact information: 5%
  
  const overallScore = Math.round(
    (keywordScore * 0.35) +
    (skillScore * 0.20) +
    (experienceScore * 0.15) +
    (formatScore * 0.15) +
    (sectionScore * 0.10) +
    (contactScore * 0.05)
  );

  return {
    overallScore,
    breakdown: {
      keywordScore,
      skillScore,
      experienceScore,
      formatScore,
      sectionScore,
      contactScore
    }
  };
};
