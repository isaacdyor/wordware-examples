"use client";

import { useFirstResponse } from "@/hooks/use-first-response";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export function ChatDetail() {
  const params = useParams();
  const { data: conversation } = api.conversations.getById.useQuery({
    id: params.id as string,
  });

  const { streamedContent, invalidated } = useFirstResponse(conversation);

  return (
    <div className="flex flex-col gap-4">
      {conversation?.messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
      {!invalidated && streamedContent}
    </div>
  );
}
