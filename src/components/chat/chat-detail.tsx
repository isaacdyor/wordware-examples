"use client";

import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { User } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { AssistantMessage } from "./assistant-message";
import { ChatInput } from "./chat-input";

export function ChatDetail() {
  const params = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversation } = api.conversations.getById.useQuery({
    id: params.id as string,
  });

  // starts stream and adds response to database
  const { streamedContent, fetchStream, isLoading } = useChat({ conversation });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversation?.messages, streamedContent]);

  useEffect(() => {
    if (conversation?.messages.length === 1) {
      void fetchStream("4cfc2a23-2a4e-4038-a452-ac74c1faaa82", {
        message: conversation?.messages[0]?.content,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!conversation || conversation.messages.length === 0) redirect("/chat");

  return (
    <div className="mx-auto flex h-[calc(100vh-56px)] w-full max-w-2xl flex-col justify-between gap-2">
      <div className="no-scrollbar flex flex-col-reverse overflow-auto">
        <div className="flex flex-col gap-2">
          {conversation.messages.map((message) =>
            message.role === "USER" ? (
              <div key={message.id} className="flex items-start gap-2">
                <div
                  className={cn(
                    "ml-auto rounded-md bg-primary px-2 py-1 text-primary-foreground",
                    message.role === "USER"
                      ? ""
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
            ) : (
              <AssistantMessage key={message.id} message={message.content} />
            ),
          )}
          <AssistantMessage message={streamedContent} isLoading={isLoading} />
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput conversation={conversation} fetchStream={fetchStream} />
    </div>
  );
}
