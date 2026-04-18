import { notFound } from "next/navigation";
import { AppShell } from "@/components/setu/app-shell";
import { WorkspaceChat } from "@/components/setu/workspace-chat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects, getWorkspaceMessages, normalizeProjectId } from "@/lib/backend";

type WorkspacePageProps = {
  params: Promise<{ id: string }>;
};

const milestones = [
  { id: "ms1", name: "Scope lock", status: "completed" },
  { id: "ms2", name: "MVP build", status: "in-progress" },
  { id: "ms3", name: "QA + handover", status: "pending" },
];

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { id } = await params;
  const projectId = normalizeProjectId(id);
  const [projects, workspaceMessages] = await Promise.all([
    getProjects(),
    getWorkspaceMessages(projectId),
  ]);
  const project = projects.find((item) => normalizeProjectId(item.id) === projectId);

  if (!project) {
    notFound();
  }

  return (
    <AppShell title="Workspace" subtitle={project.title}>
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="bg-white lg:col-span-3">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
            <CardDescription>Project communication stream</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <WorkspaceChat projectId={projectId} messages={workspaceMessages} />
          </CardContent>
        </Card>

        <Card className="bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <CardDescription>Track status without clutter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="rounded-lg border p-3">
                <p className="font-medium">{milestone.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {milestone.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Blocked
                    </Button>
                    <Button size="sm" className="bg-green-700 hover:bg-green-600">
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

