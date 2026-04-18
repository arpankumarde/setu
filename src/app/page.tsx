import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects, getStudents } from "@/lib/backend";

const steps = [
  "Businesses post real work, not generic job descriptions.",
  "Students get ranked by demonstrable skills and shipped outcomes.",
  "Setu suggests best-fit talent and opens a live delivery workspace.",
];

export default async function Page() {
  const [students, projects] = await Promise.all([getStudents(), getProjects()]);
  const featuredStudent = students[0];
  const featuredProject = projects[0];

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 py-10">
      <section className="space-y-5">
        <Badge variant="outline">Setu MVP</Badge>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[#111111]">
          Proof of work beats resumes.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Setu helps students get hired through shipped projects, and helps MSMEs
          hire through verified execution.
        </p>
        <div className="flex gap-3">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-500">
            <Link href="/student">Student</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/business">Business</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step} className="bg-white">
            <CardHeader>
              <CardTitle>Step {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{step}</CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>{featuredStudent?.name ?? "No student yet"}</CardTitle>
            <CardDescription>{featuredStudent?.title ?? "Add students to begin"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {(featuredStudent?.skills ?? []).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Score {featuredStudent?.score ?? 0} based on consistency, delivery quality,
              and project outcomes.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>{featuredProject?.title ?? "No project yet"}</CardTitle>
            <CardDescription>{featuredProject?.budget ?? "Create your first project"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {featuredProject?.description ?? "Project details will appear here."}
            </p>
            <div className="flex flex-wrap gap-2">
              {(featuredProject?.requiredSkills ?? []).map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
