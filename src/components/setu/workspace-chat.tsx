"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendWorkspaceMessage } from "@/lib/backend";
import type { Message } from "@/types/setu";

type WorkspaceChatProps = {
  projectId: number;
  messages: Message[];
};

export function WorkspaceChat({ projectId, messages }: WorkspaceChatProps) {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSend = () => {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }
    startTransition(async () => {
      await sendWorkspaceMessage({
        projectId,
        sender: "business",
        content: trimmed,
      });
      setContent("");
      router.refresh();
    });
  };

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div key={message.id} className="rounded-lg border bg-[#FAFAFA] p-3">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span className="capitalize">{message.sender}</span>
            <span>{message.createdAt}</span>
          </div>
          <p className="text-sm">{message.content}</p>
        </div>
      ))}
      <div className="flex gap-2 pt-2">
        <Input
          placeholder="Send a message to the project workspace"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSend();
            }
          }}
        />
        <Button onClick={onSend} disabled={isPending} className="bg-indigo-600 hover:bg-indigo-500">
          Send
        </Button>
      </div>
    </div>
  );
}
