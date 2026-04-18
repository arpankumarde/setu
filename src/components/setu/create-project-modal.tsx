"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const suggestedSkills = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Tailwind",
];

export function CreateProjectModal() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Next.js",
    "TypeScript",
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-500">Create Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Add the essentials. You can refine scope after posting.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-title">Title</Label>
            <Input id="project-title" placeholder="B2B lead qualification dashboard" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe what should be built and what success looks like."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-budget">Budget</Label>
            <Input id="project-budget" placeholder="INR 40,000" />
          </div>

          <div className="space-y-2">
            <Label>Required skills</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className="cursor-pointer"
                >
                  <Badge
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className={
                      selectedSkills.includes(skill) ? "bg-indigo-600 text-white" : ""
                    }
                  >
                    {skill}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-500">Save Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

