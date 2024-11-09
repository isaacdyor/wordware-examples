"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { MarkdownRenderer } from "../markdown-renderer";

export function AssistantMessage({
  message,
  isLoading,
}: {
  message: string;
  isLoading?: boolean;
}) {
  if (message === "" && !isLoading) return null;

  return (
    <div className="flex items-start gap-2 pr-10">
      <div className="rounded-full bg-muted p-1.5">
        <Bot className="size-5 text-muted-foreground" />
      </div>
      <div className="rounded-md bg-secondary px-3 py-2 text-secondary-foreground">
        {isLoading && message === "" ? (
          <div className="flex h-4 items-center space-x-2 px-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="h-2 w-2 rounded-full bg-primary"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.0,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
            ))}
          </div>
        ) : (
          <MarkdownRenderer content={message ?? ""} />
        )}
      </div>
    </div>
  );
}
