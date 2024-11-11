"use client";

import { motion } from "framer-motion";
import { Bot, CopyIcon, ThumbsDown, ThumbsUp } from "lucide-react";
import { MarkdownRenderer } from "../markdown-renderer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function AssistantMessage({
  message,
  isLoading,
}: {
  message: string;
  isLoading?: boolean;
}) {
  if (message === "" && !isLoading) return null;

  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full border p-1.5">
        <Bot className="size-5 text-muted-foreground" />
      </div>
      <div className="text-secondary-foreground">
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
          <div className="flex flex-col gap-2">
            <MarkdownRenderer content={message ?? ""} />
            <TooltipProvider delayDuration={0}>
              <div className="flex flex-row gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="h-fit px-1 py-1 text-muted-foreground"
                      variant="outline"
                      onClick={async () => {
                        await navigator.clipboard.writeText(message);
                        toast.success("Copied to clipboard!");
                      }}
                    >
                      <CopyIcon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="!pointer-events-auto h-fit px-1 py-1 text-muted-foreground"
                      variant="outline"
                    >
                      <ThumbsUp className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Upvote Response</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="!pointer-events-auto h-fit px-1 py-1 text-muted-foreground"
                      variant="outline"
                    >
                      <ThumbsDown className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Downvote Response</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
}
