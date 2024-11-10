"use client";

import { CheckCheck, SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/trpc/react";
import { type Conversation } from "@prisma/client";
import { cn } from "@/lib/utils";

export function ChatDetailTopbarContent({
  conversation,
}: {
  conversation: Conversation;
}) {
  const [title, setTitle] = useState(conversation.name);
  const [width, setWidth] = useState(102);
  const [saved, setSaved] = useState(false);
  const measureRef = useRef<HTMLSpanElement>(null);
  const debouncedTitle = useDebounce(title, 800);

  const { mutate } = api.conversations.update.useMutation();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    mutate({
      where: {
        id: conversation.id,
      },
      data: {
        name: debouncedTitle,
      },
    });
    setSaved(true);
    const timer = setTimeout(() => {
      setSaved(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [debouncedTitle]);

  useEffect(() => {
    if (measureRef.current) {
      const maxWidth = window.innerWidth < 640 ? 250 : 500;
      const newWidth = Math.min(
        Math.max(measureRef.current.offsetWidth, 102),
        maxWidth,
      );
      setWidth(newWidth);
    }
  }, [title]);

  return (
    <>
      <div className="flex items-center">
        <div className="relative">
          <span
            ref={measureRef}
            className="invisible absolute whitespace-pre px-2 py-0.5 text-sm"
            style={{ fontFamily: "inherit" }}
          >
            {title}
          </span>

          <Input
            placeholder="Chat name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-6 border-none focus-visible:ring-0"
            style={{ width: `${width}px` }}
          />
        </div>
        <div
          className={cn(
            "invisible flex size-4 items-center gap-1 text-xs text-muted-foreground",
            saved && "visible",
          )}
        >
          <p>Saved</p>
          <CheckCheck className="size-3 shrink-0" />
        </div>
      </div>

      <Button className="size-4 bg-background p-0 text-foreground hover:bg-background hover:text-muted-foreground">
        <SquarePen className="size-5" />
      </Button>
    </>
  );
}
