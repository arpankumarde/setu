import { AppShell } from "@/components/setu/app-shell";
import { CreateProjectModal } from "@/components/setu/create-project-modal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProjects } from "@/lib/backend";

export default async function BusinessPage() {
  const businessProjects = await getProjects();

  return (
    <AppShell
      title="Business Dashboard"
      subtitle="Post projects and hire by proven execution."
    >
      <Card className="bg-white">
        <CardHeader className="flex items-center justify-between gap-4 sm:flex-row">
          <div>
            <CardTitle>Posted Projects</CardTitle>
            <CardDescription>
              Keep scope crisp and evaluate with outcomes.
            </CardDescription>
          </div>
          <CreateProjectModal />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.budget}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{project.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}

