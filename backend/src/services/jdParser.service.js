/**
 * Job Description Parser Service
 * Cleans text and extracts skills/keywords
 */

const skillDictionary = [
  // Frontend
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Redux', 'Tailwind CSS', 'Bootstrap',
  // Backend
  'Node.js', 'Express.js', 'REST API', 'GraphQL', 'Authentication', 'JWT',
  // Database
  'MongoDB', 'Mongoose', 'MySQL', 'PostgreSQL', 'Redis',
  // DevOps
  'Git', 'GitHub', 'Docker', 'CI/CD', 'AWS', 'Vercel', 'Render',
  // Testing
  'Jest', 'Supertest', 'React Testing Library',
  // General/Soft Skills
  'Agile', 'Scrum', 'Problem Solving', 'Communication', 'Teamwork'
];

const cleanText = (text) => {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
};

const extractSkills = (text) => {
  const extracted = [];
  const lowerText = text.toLowerCase();

  skillDictionary.forEach(skill => {
    // Escape special characters for regex (like . in Node.js)
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match skill as whole word, case insensitive
    // Handle cases like "Node.js" by allowing non-word characters after if they are part of the skill
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'gi');
    
    if (regex.test(text)) {
      extracted.push(skill);
    }
  });

  return extracted;
};

const extractKeywords = (text) => {
  // Simple keyword extraction: words that are capitalized or look important
  // For now, we'll extract words that appear frequently and aren't common stop words
  const stopWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'your', 'will', 'our', 'are', 'work', 'experience', 'skills', 'requirements', 'must', 'should', 'join', 'team', 'company']);
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  const freq = {};
  words.forEach(word => {
    freq[word] = (freq[word] || 0) + 1;
  });

  // Return top 15 frequent "important" words as keywords
  return Object.keys(freq)
    .sort((a, b) => freq[b] - freq[a])
    .slice(0, 15);
};

exports.parseJD = (jdData) => {
  const { jobTitle, companyName, jobDescription } = jdData;
  const cleanedText = cleanText(jobDescription);
  
  const skills = extractSkills(cleanedText);
  const keywords = extractKeywords(cleanedText);

  return {
    jobTitle,
    companyName,
    cleanedText,
    skills,
    keywords
  };
};
