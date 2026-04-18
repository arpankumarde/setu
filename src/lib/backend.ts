import { businessProjects, students, workspaceMessages } from "@/lib/mock-data";
import type { BusinessProject, Message, Student } from "@/types/setu";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

type BackendStudent = {
  id: number;
  name: string;
  skills: string[];
  score: number;
  github_url: string | null;
};

type BackendProject = {
  id: number;
  title: string;
  description: string;
  budget: string;
  required_skills: string[];
};

type BackendMatch = {
  student_id: number;
  project_id: number;
  match_score: number;
  matched_skills: string[];
};

type BackendMessage = {
  id: number;
  project_id: number;
  sender: "student" | "business";
  content: string;
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

function mapStudent(student: BackendStudent): Student {
  return {
    id: String(student.id),
    name: student.name,
    title: "Student Builder",
    score: student.score,
    skills: student.skills,
    github: {
      commits30d: 0,
      pullRequests: 0,
      streakDays: 0,
    },
    projects: [],
  };
}

function mapProject(project: BackendProject): BusinessProject {
  return {
    id: String(project.id),
    title: project.title,
    description: project.description,
    budget: project.budget,
    requiredSkills: project.required_skills,
    status: "open",
    milestoneCount: 3,
  };
}

export function normalizeProjectId(id: string): number {
  const parsed = Number(id);
  if (!Number.isNaN(parsed)) {
    return parsed;
  }
  const digits = id.replace(/\D/g, "");
  return Number(digits);
}

export async function getStudents(): Promise<Student[]> {
  try {
    const data = await apiFetch<BackendStudent[]>("/students");
    return data.map(mapStudent);
  } catch {
    return students;
  }
}

export async function getProjects(): Promise<BusinessProject[]> {
  try {
    const data = await apiFetch<BackendProject[]>("/projects");
    return data.map(mapProject);
  } catch {
    return businessProjects;
  }
}

export async function createProject(input: {
  title: string;
  description: string;
  budget: string;
  requiredSkills: string[];
}): Promise<BusinessProject> {
  const payload = {
    title: input.title,
    description: input.description,
    budget: input.budget,
    required_skills: input.requiredSkills,
  };
  const created = await apiFetch<BackendProject>("/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return mapProject(created);
}

export async function getMatches(projectId: number): Promise<BackendMatch[]> {
  return apiFetch<BackendMatch[]>(`/match/${projectId}`);
}

export async function getWorkspaceMessages(projectId: number): Promise<Message[]> {
  try {
    const data = await apiFetch<BackendMessage[]>(`/workspace/${projectId}`);
    return data.map((message) => ({
      id: String(message.id),
      sender: message.sender,
      content: message.content,
      createdAt: `#${message.id}`,
    }));
  } catch {
    return workspaceMessages;
  }
}

export async function sendWorkspaceMessage(input: {
  projectId: number;
  sender: "student" | "business";
  content: string;
}): Promise<void> {
  await apiFetch<BackendMessage>(`/workspace/${input.projectId}`, {
    method: "POST",
    body: JSON.stringify({
      sender: input.sender,
      content: input.content,
    }),
  });
}
