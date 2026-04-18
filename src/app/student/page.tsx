import { AppShell } from "@/components/setu/app-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStudents } from "@/lib/backend";

export default async function StudentPage() {
  const students = await getStudents();
  const student = students[0];

  return (
    <AppShell
      title="Student Dashboard"
      subtitle="Showcase skills and project outcomes."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle>{student?.name ?? "No student profile yet"}</CardTitle>
            <CardDescription>{student?.title ?? "Student profile"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Setu Score:{" "}
              <span className="font-semibold text-green-700">{student?.score ?? 0}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {(student?.skills ?? []).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>GitHub Stats</CardTitle>
            <CardDescription>Profile snapshot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Commits: {student?.github.commits30d ?? 0}</p>
            <p>Pull requests: {student?.github.pullRequests ?? 0}</p>
            <p>Streak: {student?.github.streakDays ?? 0} days</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {(student?.projects ?? []).map((project) => (
          <Card key={project.id} className="bg-white">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.impact}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

