type AnalyzeProjectInput = {
  title: string;
  description: string;
  requiredSkills: string[];
};

type EvaluateSubmissionInput = {
  studentId: string;
  projectId: string;
  repositoryUrl: string;
  notes?: string;
};

type OutreachLead = {
  businessName: string;
  contactName: string;
  useCase: string;
};

export async function analyzeProjectBrief(input: AnalyzeProjectInput) {
  return {
    summary: `Project "${input.title}" needs clear scope with measurable delivery outcomes.`,
    riskAreas: ["Unclear timeline", "Missing acceptance criteria"],
    recommendedMilestones: [
      "Finalize scope and success metrics",
      "Build MVP workflow",
      "QA + deployment handover",
    ],
  };
}

export async function suggestStudents(projectId: string) {
  return {
    projectId,
    suggestions: [
      { studentId: "stu_1", matchScore: 94, reason: "Strong frontend delivery" },
      { studentId: "stu_2", matchScore: 90, reason: "Balanced full-stack profile" },
      { studentId: "stu_3", matchScore: 84, reason: "Reliable backend execution" },
    ],
  };
}

export async function evaluateSubmission(data: EvaluateSubmissionInput) {
  return {
    studentId: data.studentId,
    projectId: data.projectId,
    repositoryUrl: data.repositoryUrl,
    verdict: "pass",
    score: 88,
    feedback: [
      "Good implementation quality and readability",
      "Add test coverage for edge-case validation",
    ],
  };
}

export async function generateOutreachMessage(lead: OutreachLead) {
  return {
    subject: `Setu can help ${lead.businessName} hire by proof-of-work`,
    body: `Hi ${lead.contactName}, we help MSMEs hire students based on real project outcomes for ${lead.useCase}. Happy to share 3 matched profiles this week.`,
  };
}

