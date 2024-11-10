"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type Conversation } from "@prisma/client";
import { CheckCheck, SquarePen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ChatDetailTopbarContent({
  conversation,
}: {
  conversation: Conversation;
}) {
  const [title, setTitle] = useState(conversation.name);
  const [width, setWidth] = useState(500);
  const [saved, setSaved] = useState(false);
  const measureRef = useRef<HTMLSpanElement>(null);
  const debouncedTitle = useDebounce(title, 800);

  const utils = api.useUtils();

  const { mutate } = api.conversations.update.useMutation({
    onSuccess: async () => {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
      await utils.spaces.getCurrent.invalidate();
    },
  });

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
  }, [conversation.id, debouncedTitle, mutate]);

  useEffect(() => {
    if (measureRef.current) {
      const newWidth =
        Math.min(Math.max(measureRef.current.offsetWidth, 50), 500) + 10;
      setWidth(newWidth);
    }
  }, [title]);

  return (
    <>
      <div className="flex items-center">
        <div className="relative">
          <span
            ref={measureRef}
            className="invisible absolute whitespace-pre py-0.5 pl-3 pr-1 text-sm"
            style={{ fontFamily: "inherit" }}
          >
            {title}
          </span>

          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-6 max-w-xl border-none text-center focus-visible:ring-0 sm:max-w-none"
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

      <Button className="size-4 bg-transparent p-0 text-foreground hover:bg-transparent hover:text-muted-foreground">
        <SquarePen className="size-5" />
      </Button>
    </>
  );
}
