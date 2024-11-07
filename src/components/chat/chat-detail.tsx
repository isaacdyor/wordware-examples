"use client";

import { useFirstResponse } from "@/hooks/use-first-response";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export function ChatDetail() {
  const params = useParams();
  const { data: conversation } = api.conversations.getById.useQuery({
    id: params.id as string,
  });

  const { streamedContent } = useFirstResponse(conversation);

  return <div>{streamedContent}</div>;
}
