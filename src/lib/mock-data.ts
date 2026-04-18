import type { BusinessProject, Match, Message, Student } from "@/types/setu";

export const students: Student[] = [
  {
    id: "stu_1",
    name: "Aarav Singh",
    title: "Frontend + Automation Builder",
    score: 92,
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    github: {
      commits30d: 87,
      pullRequests: 14,
      streakDays: 21,
    },
    projects: [
      {
        id: "sp_1",
        name: "Vendor Portal Revamp",
        description: "Rebuilt onboarding flow with role-based dashboard.",
        impact: "Reduced onboarding time by 38%.",
        skills: ["Next.js", "TypeScript", "PostgreSQL"],
        status: "completed",
      },
      {
        id: "sp_2",
        name: "WhatsApp Lead Capture",
        description: "Built webhook + CRM sync pipeline for local retailers.",
        impact: "Lifted lead response rate by 24%.",
        skills: ["Node.js", "Prisma", "Automation"],
        status: "completed",
      },
    ],
  },
  {
    id: "stu_2",
    name: "Nisha Patel",
    title: "Full-stack Product Engineer",
    score: 89,
    skills: ["Node.js", "Prisma", "REST APIs", "React"],
    github: {
      commits30d: 65,
      pullRequests: 11,
      streakDays: 16,
    },
    projects: [
      {
        id: "sp_3",
        name: "Inventory Forecast Assistant",
        description: "Shipped dashboard for purchase cycle planning.",
        impact: "Improved stock fill-rate by 18%.",
        skills: ["Node.js", "Prisma", "Charting"],
        status: "completed",
      },
    ],
  },
  {
    id: "stu_3",
    name: "Kabir Mehta",
    title: "Backend + Data Workflows",
    score: 86,
    skills: ["Python", "FastAPI", "SQL", "ETL"],
    github: {
      commits30d: 58,
      pullRequests: 9,
      streakDays: 12,
    },
    projects: [
      {
        id: "sp_4",
        name: "Order Insights Bot",
        description: "Generated weekly insight digests for operations teams.",
        impact: "Cut manual reporting time by 7 hours/week.",
        skills: ["Python", "FastAPI", "PostgreSQL"],
        status: "completed",
      },
    ],
  },
];

export const businessProjects: BusinessProject[] = [
  {
    id: "proj_101",
    title: "B2B Lead Qualification Dashboard",
    description:
      "Need a lightweight dashboard to track inbound leads and assign follow-ups.",
    budget: "INR 35,000",
    requiredSkills: ["Next.js", "TypeScript", "PostgreSQL"],
    status: "open",
    milestoneCount: 4,
  },
  {
    id: "proj_102",
    title: "Service Ticket Workflow for Ops Team",
    description:
      "Design and ship an internal tool to log, prioritize, and close service tickets.",
    budget: "INR 48,000",
    requiredSkills: ["React", "Node.js", "API Design"],
    status: "in-progress",
    milestoneCount: 5,
  },
];

export const matches: Match[] = [
  {
    projectId: "proj_101",
    suggestedStudents: [
      {
        studentId: "stu_1",
        reason: "Strong Next.js shipping history and dashboard experience.",
        score: 94,
      },
      {
        studentId: "stu_2",
        reason: "Solid backend integration and product ownership.",
        score: 90,
      },
      {
        studentId: "stu_3",
        reason: "Great systems thinking and data workflow experience.",
        score: 84,
      },
    ],
  },
];

export const workspaceMessages: Message[] = [
  {
    id: "m_1",
    sender: "business",
    content:
      "Please prioritize role-based access first. Our team needs admin + member modes.",
    createdAt: "10:15 AM",
  },
  {
    id: "m_2",
    sender: "student",
    content:
      "Done. I will push access-control screens by EOD and share demo credentials.",
    createdAt: "10:22 AM",
  },
  {
    id: "m_3",
    sender: "system",
    content: "Milestone 2 due in 2 days.",
    createdAt: "11:00 AM",
  },
];

