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

export function AssistantMessage({ message }: { message: string }) {
  if (message === "") return null;

  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full border p-1.5">
        <Bot className="size-5 text-muted-foreground" />
      </div>
      <div className="text-secondary-foreground">
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
                    className="h-fit px-1 py-1 text-muted-foreground"
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
                    className="h-fit px-1 py-1 text-muted-foreground"
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
      </div>
    </div>
  );
}
