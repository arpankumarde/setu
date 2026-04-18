import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Student } from "@/types/setu";

type StudentMatchCardProps = {
  student: Student;
  score: number;
  reason?: string;
};

export function StudentMatchCard({
  student,
  score,
  reason,
}: StudentMatchCardProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
        <CardDescription>{student.title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">
          Match score: <span className="font-semibold text-indigo-600">{score}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {student.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        {reason ? <p className="text-sm text-muted-foreground">{reason}</p> : null}
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">View</Button>
        <Button className="bg-indigo-600 hover:bg-indigo-500">Hire</Button>
      </CardFooter>
    </Card>
  );
}

