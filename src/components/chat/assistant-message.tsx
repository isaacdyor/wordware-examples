"use client";

import { Bot } from "lucide-react";
import { MarkdownRenderer } from "../markdown-renderer";
import { MessageActions } from "./message-actions";
import { useChatContext } from "@/hooks/use-chat-context";
import { motion } from "framer-motion";

export function AssistantMessage({ message }: { message: string }) {
  const { isGenerating } = useChatContext();

  if (message === "") return null;

  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="rounded-full border p-1.5">
        <Bot className="size-5 text-muted-foreground" />
      </div>
      <div className="text-secondary-foreground">
        <div className="flex flex-col gap-2">
          <MarkdownRenderer content={message ?? ""} />
          {!isGenerating && <MessageActions message={message} />}
        </div>
      </div>
    </motion.div>
  );
}
