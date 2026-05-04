/**
 * Resume Section Parser Service
 * Extracts contact info and identifies sections from plain text
 */

const extractContactInfo = (text) => {
  const emailRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w-]+\/?/;
  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/[\w-]+\/?/;

  const emailMatch = text.match(emailRegex);
  const phoneMatch = text.match(phoneRegex);
  const linkedinMatch = text.match(linkedinRegex);
  const githubMatch = text.match(githubRegex);

  return {
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    linkedin: linkedinMatch ? linkedinMatch[0] : '',
    github: githubMatch ? githubMatch[0] : '',
  };
};

const sectionKeywords = {
  summary: /SUMMARY|OBJECTIVE|PROFILE|ABOUT ME/i,
  skills: /SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES|TECHNOLOGIES/i,
  experience: /EXPERIENCE|WORK EXPERIENCE|EMPLOYMENT HISTORY|PROFESSIONAL EXPERIENCE/i,
  projects: /PROJECTS|PERSONAL PROJECTS|ACADEMIC PROJECTS/i,
  education: /EDUCATION|ACADEMIC BACKGROUND|QUALIFICATIONS/i,
  certifications: /CERTIFICATIONS|LICENSES|COURSES/i,
  achievements: /ACHIEVEMENTS|AWARDS|HONORS/i,
};

const parseSections = (text) => {
  const lines = text.split('\n');
  const sections = {
    summary: '',
    skills: '',
    experience: '',
    projects: '',
    education: '',
    certifications: '',
    achievements: '',
  };

  let currentSection = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    // Check if line is a section header (usually short, uppercase, or matches keywords)
    let foundHeader = false;
    for (const [section, regex] of Object.entries(sectionKeywords)) {
      if (regex.test(trimmedLine) && trimmedLine.length < 30) {
        currentSection = section;
        foundHeader = true;
        break;
      }
    }

    if (!foundHeader && currentSection) {
      sections[currentSection] += trimmedLine + ' ';
    }
  });

  // Clean up sections
  for (const key in sections) {
    sections[key] = sections[key].trim();
  }

  return sections;
};

exports.parseResumeStructure = (text) => {
  const contact = extractContactInfo(text);
  const sections = parseSections(text);

  const checks = {
    hasEmail: !!contact.email,
    hasPhone: !!contact.phone,
    hasLinkedIn: !!contact.linkedin,
    hasGitHub: !!contact.github,
    hasSummary: !!sections.summary,
    hasSkills: !!sections.skills,
    hasExperience: !!sections.experience,
    hasEducation: !!sections.education,
    hasProjects: !!sections.projects,
  };

  return {
    contact,
    sections,
    checks,
  };
};
