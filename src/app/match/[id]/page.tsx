import { notFound } from "next/navigation";
import { AppShell } from "@/components/setu/app-shell";
import { StudentMatchCard } from "@/components/setu/student-match-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { businessProjects, matches, students } from "@/lib/mock-data";

type MatchPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MatchPage({ params }: MatchPageProps) {
  const { id } = await params;
  const project = businessProjects.find((item) => item.id === id);
  const match = matches.find((item) => item.projectId === id);

  if (!project || !match) {
    notFound();
  }

  const suggestedStudents = match.suggestedStudents
    .map((suggestion) => {
      const student = students.find((item) => item.id === suggestion.studentId);
      if (!student) {
        return null;
      }
      return { student, reason: suggestion.reason, score: suggestion.score };
    })
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  return (
    <AppShell title="Project Match" subtitle={`Matching talent for ${project.title}`}>
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.budget}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.requiredSkills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:col-span-3">
          {suggestedStudents.map((entry) => (
            <StudentMatchCard
              key={entry.student.id}
              student={entry.student}
              score={entry.score}
              reason={entry.reason}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}

