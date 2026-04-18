export type SkillTag = string;

export type Student = {
  id: string;
  name: string;
  title: string;
  score: number;
  skills: SkillTag[];
  github: {
    commits30d: number;
    pullRequests: number;
    streakDays: number;
  };
  projects: StudentProject[];
};

export type StudentProject = {
  id: string;
  name: string;
  description: string;
  impact: string;
  skills: SkillTag[];
  status: "in-progress" | "completed";
};

export type BusinessProject = {
  id: string;
  title: string;
  description: string;
  budget: string;
  requiredSkills: SkillTag[];
  status: "open" | "in-review" | "in-progress" | "completed";
  milestoneCount: number;
};

export type Match = {
  projectId: string;
  suggestedStudents: Array<{
    studentId: string;
    reason: string;
    score: number;
  }>;
};

export type Message = {
  id: string;
  sender: "student" | "business" | "system";
  content: string;
  createdAt: string;
};

