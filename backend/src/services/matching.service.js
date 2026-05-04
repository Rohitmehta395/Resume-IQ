/**
 * Matching Service
 * Compares resume text with job description
 */

const skillDictionary = [
  // Frontend
  { name: 'React', variations: ['react', 'react.js', 'reactjs'] },
  { name: 'JavaScript', variations: ['javascript', 'js'] },
  { name: 'TypeScript', variations: ['typescript', 'ts'] },
  { name: 'HTML', variations: ['html', 'html5'] },
  { name: 'CSS', variations: ['css', 'css3'] },
  { name: 'Redux', variations: ['redux'] },
  { name: 'Tailwind CSS', variations: ['tailwind', 'tailwindcss'] },
  { name: 'Bootstrap', variations: ['bootstrap'] },
  
  // Backend
  { name: 'Node.js', variations: ['node.js', 'nodejs', 'node'] },
  { name: 'Express.js', variations: ['express.js', 'express', 'expressjs'] },
  { name: 'REST API', variations: ['rest api', 'restful api', 'rest'] },
  { name: 'GraphQL', variations: ['graphql'] },
  { name: 'Authentication', variations: ['authentication', 'auth', 'jwt', 'oauth'] },
  
  // Database
  { name: 'MongoDB', variations: ['mongodb', 'mongo db', 'mongo'] },
  { name: 'Mongoose', variations: ['mongoose'] },
  { name: 'MySQL', variations: ['mysql'] },
  { name: 'PostgreSQL', variations: ['postgresql', 'postgres'] },
  { name: 'Redis', variations: ['redis'] },
  
  // DevOps
  { name: 'Git', variations: ['git'] },
  { name: 'GitHub', variations: ['github'] },
  { name: 'Docker', variations: ['docker'] },
  { name: 'CI/CD', variations: ['ci/cd', 'cicd', 'continuous integration'] },
  { name: 'AWS', variations: ['aws', 'amazon web services'] },
  { name: 'Vercel', variations: ['vercel'] },
  
  // Testing
  { name: 'Jest', variations: ['jest'] },
  { name: 'Supertest', variations: ['supertest'] },
  { name: 'React Testing Library', variations: ['react testing library', 'rtl'] },
];

const extractSkillsFromText = (text) => {
  const extracted = new Set();
  const lowerText = text.toLowerCase();

  skillDictionary.forEach(skill => {
    for (const variation of skill.variations) {
      const escapedVar = variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedVar}\\b`, 'gi');
      if (regex.test(lowerText)) {
        extracted.add(skill.name);
        break;
      }
    }
  });

  return Array.from(extracted);
};

const extractKeywords = (text) => {
  const stopWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'your', 'will', 'our', 'are', 'work', 'experience', 'skills', 'requirements', 'must', 'should', 'join', 'team', 'company', 'looking', 'role', 'developer', 'engineer', 'using', 'using', 'build', 'create', 'design', 'maintain']);
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  const freq = {};
  words.forEach(word => {
    freq[word] = (freq[word] || 0) + 1;
  });

  return freq;
};

exports.analyzeMatch = (resumeText, jdText) => {
  const resumeSkills = extractSkillsFromText(resumeText);
  const jdSkills = extractSkillsFromText(jdText);

  const matchedSkills = jdSkills.filter(skill => resumeSkills.includes(skill));
  const missingSkills = jdSkills.filter(skill => !resumeSkills.includes(skill));

  const resumeKeywords = extractKeywords(resumeText);
  const jdKeywords = extractKeywords(jdText);

  // Top 20 keywords from JD
  const importantJdKeywords = Object.keys(jdKeywords)
    .sort((a, b) => jdKeywords[b] - jdKeywords[a])
    .slice(0, 20);

  const matchedKeywords = importantJdKeywords.filter(keyword => resumeKeywords[keyword]);
  const missingKeywords = importantJdKeywords.filter(keyword => !resumeKeywords[keyword]);

  return {
    resumeSkills,
    jdSkills,
    matchedSkills,
    missingSkills,
    matchedKeywords,
    missingKeywords,
  };
};
