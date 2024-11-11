"use client";

import { useChatContext } from "@/hooks/use-chat-context";
import { useStreamLLM } from "@/hooks/use-stream-llm";
import { api } from "@/trpc/react";
import { redirect, useParams } from "next/navigation";
import { type DragEvent, useEffect, useRef } from "react";
import { AssistantMessage } from "./assistant-message";
import { ChatInput } from "./chat-input";
import { motion } from "framer-motion";

export function ChatDetail() {
  const params = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setPageDragging, countRef, isGenerating, setIsGenerating } =
    useChatContext();

  const { data: conversation } = api.conversations.getById.useQuery({
    id: params.id as string,
  });

  const { streamedContent, streamLLM } = useStreamLLM({
    conversation,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversation?.messages, streamedContent]);

  useEffect(() => {
    if (
      conversation?.messages.length === 1 &&
      conversation?.messages[0]?.content
    ) {
      setIsGenerating(true);
      void streamLLM(conversation?.messages[0]?.content);
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
          <div className="flex w-full flex-col gap-4 lg:max-w-3xl">
            {conversation.messages.map((message) =>
              message.role === "USER" ? (
                <motion.div
                  key={message.id}
                  className="ml-auto flex flex-col gap-2 rounded-xl bg-primary px-3 py-2 text-primary-foreground"
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  data-role={message.role}
                >
                  {message.content.split("\n").map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap break-words">
                      {line}
                    </p>
                  ))}
                </motion.div>
              ) : (
                <AssistantMessage key={message.id} message={message.content} />
              ),
            )}
            {isGenerating ? (
              <AssistantMessage message="Thinking..." />
            ) : (
              <AssistantMessage message={streamedContent} />
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput conversation={conversation} />
      </div>
    </div>
  );
}
