"use client";

import { useFirstResponse } from "@/hooks/use-first-response";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Bot, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { ChatInput } from "./chat-input";

export function ChatDetail() {
  const params = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversation } = api.conversations.getById.useQuery({
    id: params.id as string,
  });

  const { streamedContent, invalidated } = useFirstResponse(conversation);

  // Regular useEffect for subsequent scrolls
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversation?.messages, streamedContent]);

  if (!conversation) return null;

  return (
    <div className="mx-auto flex h-[calc(100vh-56px)] w-full max-w-2xl flex-col justify-between gap-4">
      <div className="no-scrollbar flex flex-col-reverse gap-2 overflow-y-scroll">
        <div ref={messagesEndRef} />
        {[...conversation?.messages].reverse().map((message) => (
          <div key={message.id} className="flex items-start gap-2">
            <div
              className={cn(
                "hidden rounded-full bg-muted p-1.5",
                message.role === "ASSISTANT" && "block",
              )}
            >
              <Bot className="size-5 text-muted-foreground" />
            </div>
            <div
              className={cn(
                "rounded-md px-2 py-1",
                message.role === "USER"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              <p className="break-words">{message.content}</p>
            </div>
            <div
              className={cn(
                "hidden rounded-full bg-muted p-1.5",
                message.role === "USER" && "block",
              )}
            >
              <User className="size-5 text-muted-foreground" />
            </div>
          </div>
        ))}
        {!invalidated && streamedContent}
      </div>

      <ChatInput conversation={conversation} />
    </div>
  );
}
