"use client";

import { useChat } from "@/hooks/use-chat";
import { useChatContext } from "@/hooks/use-chat-context";
import { api } from "@/trpc/react";
import { User } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { type DragEvent, useEffect, useRef } from "react";
import { AssistantMessage } from "./assistant-message";
import { ChatInput } from "./chat-input";

export function ChatDetail() {
  const params = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDragging, setIsDragging, countRef, isLoading, setIsLoading } =
    useChatContext();

  const { data: conversation } = api.conversations.getById.useQuery({
    id: params.id as string,
  });

  // starts stream and adds response to database
  const { streamedContent, fetchStream } = useChat({
    conversation,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversation?.messages, streamedContent]);

  // useEffect(() => {
  //   if (conversation?.messages.length === 1) {
  //     void fetchStream("4cfc2a23-2a4e-4038-a452-ac74c1faaa82", {
  //       message: conversation?.messages[0]?.content,
  //     });
  //     setTimeout(() => {
  //       setIsLoading(true);
  //     }, 1000);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    countRef.current++;
    if (countRef.current === 1) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    countRef.current--;
    if (countRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    countRef.current = 0;
    setIsDragging(false);
  };

  if (!conversation || conversation.messages.length === 0) redirect("/chat");

  return (
    <div
      className="relative flex h-[calc(100vh-73px)] flex-col justify-between gap-4"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="no-scrollbar flex flex-col-reverse overflow-auto pb-4">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 lg:max-w-3xl">
          {conversation.messages.map((message) =>
            message.role === "USER" ? (
              <div key={message.id} className="flex items-start gap-2 pl-10">
                <div className="ml-auto rounded-md bg-primary px-2 py-1 text-primary-foreground">
                  <p className="break-words">{message.content}</p>
                </div>
                <div className="rounded-full bg-muted p-1.5">
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
