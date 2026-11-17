const { GoogleGenerativeAI } = require("@google/generative-ai");

const getAiFeedback = async (analysisData) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return getFallbackFeedback(analysisData);
  }

  const {
    resumeText,
    jobTitle,
    jobDescription,
    matchedSkills,
    missingSkills,
    scoreBreakdown,
  } = analysisData;

  const prompt = `
You are an expert Resume Consultant and ATS Specialist.
Analyze the following resume against the job description and provide structured feedback.

JOB TITLE: ${jobTitle}
JOB DESCRIPTION: ${jobDescription}
RESUME TEXT: ${resumeText.substring(0, 4000)}

ATS MATCH DATA:
- Matched Skills: ${matchedSkills.join(", ")}
- Missing Skills: ${missingSkills.join(", ")}
- Score Breakdown: ${JSON.stringify(scoreBreakdown)}

SAFETY RULES:
1. Do NOT fabricate experience.
2. Do NOT suggest lying.
3. Do NOT tell the user to add skills they do not have.
4. Suggest honest wording and practical improvements.
5. Be specific to the job and resume provided.

RETURN ONLY A VALID JSON OBJECT — no markdown, no backticks, no explanation — with this exact structure:
{
  "overallFeedback": "One paragraph summarizing the match quality.",
  "topIssues": ["3-5 high-priority issues to fix"],
  "sectionFeedback": {
    "summary": "Feedback on professional summary/objective",
    "skills": "How to better present skills",
    "experience": "Tips for improving bullet points or relevance",
    "projects": "How to showcase projects better",
    "education": "Feedback on education section"
  },
  "rewriteSuggestions": [
    {
      "original": "A specific sentence or bullet from the resume that needs work",
      "improved": "The rewritten version",
      "reason": "Why this change helps"
    }
  ]
}
`;

  // Verified available models for this API key in order of availability & throughput
  const candidateModels = [
    process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
    "gemini-3.5-flash-lite",
    "gemini-3.8-flash",
    "gemini-flash-latest",
  ];

  const genAI = new GoogleGenerativeAI(apiKey);

  for (const modelName of candidateModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      // Strip markdown code fences if present
      const clean = text.replace(/```json|```/g, "").trim();
      const aiResult = JSON.parse(clean);

      return {
        ...aiResult,
        isAiGenerated: true,
      };
    } catch (error) {
      console.warn(`[Gemini AI] Model "${modelName}" failed (${error.status || error.message}). Trying fallback model...`);
    }
  }

  console.error("All Gemini AI candidate models temporarily unavailable. Using rule-based fallback feedback.");
  return getFallbackFeedback(analysisData);
};

const getFallbackFeedback = (data) => {
  const missing = data?.missingSkills?.slice(0, 3)?.join(", ");
  return {
    overallFeedback:
      "Your resume demonstrates foundational alignment with the role, but key technical competencies and quantifiable achievements are required to consistently pass enterprise ATS screening filters.",
    topIssues: [
      missing ? `Missing key required competencies: ${missing}.` : "Missing critical skills requested in the job description.",
      "Bullet points focus on routine job duties rather than quantifiable outcomes (X-Y-Z formula).",
      "Keyword density from the job posting is below the optimal ATS threshold.",
    ],
    sectionFeedback: {
      summary:
        "Ensure your summary is tailored directly to this role and incorporates top target keywords in the opening sentence.",
      skills:
        "Organize technical skills into distinct categories (Languages, Frameworks, Cloud/DevOps) matching the job posting terminology.",
      experience:
        "Lead each bullet with strong action verbs and quantify the impact (e.g., latency reduction, user scale, cost efficiency).",
      projects:
        "Showcase projects that demonstrate hands-on experience with the target stack and architecture patterns.",
      education:
        "Ensure degree, relevant coursework, and industry-recognized certifications are formatted with standard ATS headings.",
    },
    rewriteSuggestions: [
      {
        original: "Responsible for developing web applications and fixing bugs.",
        improved:
          "Architected and deployed responsive web applications using React and Node.js, reducing page load times by 28% across 100K+ monthly active users.",
        reason: "Replaces passive task descriptions with specific technologies, quantified metrics, and business scale.",
      },
    ],
    isAiGenerated: false,
  };
};

module.exports = { getAiFeedback };
