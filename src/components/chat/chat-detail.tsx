"use client";

import { useStream } from "@/hooks/use-stream";
import { useChatContext } from "@/hooks/use-chat-context";
import { api } from "@/trpc/react";
import { redirect, useParams } from "next/navigation";
import { type DragEvent, useEffect, useRef } from "react";
import { AssistantMessage } from "./assistant-message";
import { ChatInput } from "./chat-input";

export function ChatDetail() {
  const params = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setPageDragging, countRef, setIsGenerating } = useChatContext();

  const { data: conversation } = api.conversations.getById.useQuery({
    id: params.id as string,
  });

  const { streamedContent, fetchStream } = useStream({
    conversation,
  });

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
      setTimeout(() => {
        setIsGenerating(true);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    countRef.current++;
    if (countRef.current === 1) {
      setPageDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    countRef.current--;
    if (countRef.current === 0) {
      setPageDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    countRef.current = 0;
    setPageDragging(false);
  };

  if (!conversation || conversation.messages.length === 0) redirect("/chat");

  return (
    // all of these divs are needed
    <div
      className="h-[calc(100vh-73px)]"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mx-auto flex h-full max-w-2xl flex-col justify-between gap-4">
        <div className="no-scrollbar flex flex-col-reverse overflow-auto pb-4">
          <div className="flex w-full flex-col gap-2 lg:max-w-3xl">
            {conversation.messages.map((message) =>
              message.role === "USER" ? (
                <div
                  key={message.id}
                  className="ml-auto flex flex-col gap-2 rounded-xl bg-primary px-3 py-2 text-primary-foreground"
                >
                  {message.content.split("\n").map((line, i) => (
                    <p key={i} className="break-words">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <AssistantMessage key={message.id} message={message.content} />
              ),
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput conversation={conversation} />
      </div>
    </div>
  );
}
