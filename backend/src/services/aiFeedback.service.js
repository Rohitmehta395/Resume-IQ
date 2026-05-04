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

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    console.error("Gemini AI Feedback Generation Failed:", error);
    return getFallbackFeedback(analysisData);
  }
};

const getFallbackFeedback = (data) => {
  return {
    overallFeedback:
      "Your resume shows some relevant experience, but there is room for optimization to better align with the job requirements. Focus on incorporating the missing skills and quantifying your achievements.",
    topIssues: [
      "Missing critical skills requested in the job description.",
      "Keywords from the JD are not sufficiently present in the text.",
      "Formatting could be improved for better ATS readability.",
    ],
    sectionFeedback: {
      summary:
        "Ensure your summary highlights your most relevant achievements for this specific role.",
      skills:
        "Organize your skills into categories and include all technical tools mentioned in the JD that you know.",
      experience:
        "Use action verbs and quantify your results (e.g., increased sales by 20%).",
      projects:
        "Focus on projects that demonstrate the core technologies required for this job.",
      education:
        "Ensure your degree and relevant certifications are clearly listed.",
    },
    rewriteSuggestions: [
      {
        original: "Responsible for developing web applications.",
        improved:
          "Developed and maintained high-performance web applications using React and Node.js, improving load times by 15%.",
        reason: "Adds specificity and quantifies the impact.",
      },
    ],
    isAiGenerated: false,
  };
};

module.exports = { getAiFeedback };
