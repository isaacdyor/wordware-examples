"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { CheckCheck, SquarePen } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

export function ChatDetailTopbar({ id }: { id: string }) {
  const conversation = api.conversations.getById.useQuery({ id });
  const [title, setTitle] = useState(conversation.data?.name ?? "");
  const initialTitle = useRef(conversation.data?.name ?? "");
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
      await utils.users.getCurrent.invalidate();
    },
  });

  useEffect(() => {
    console.log("useEffect");

    if (
      debouncedTitle !== initialTitle.current &&
      conversation.data?.name !== undefined
    ) {
      mutate({
        where: {
          id,
        },
        data: {
          name: debouncedTitle,
        },
      });
    }
  }, [debouncedTitle, conversation.data?.name, id, mutate]);

  useEffect(() => {
    if (measureRef.current) {
      const newWidth =
        Math.min(Math.max(measureRef.current.offsetWidth, 50), 500) + 10;
      setWidth(newWidth);
    }
  }, [title]);

  useEffect(() => {
    if (conversation.data?.name) {
      setTitle(conversation.data.name);
    }
  }, [conversation.data?.name]);

  return (
    <>
      <div className="flex items-center">
        <div className="relative pl-4">
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
            className="h-6 max-w-xl border-none text-center font-medium shadow-none focus-visible:ring-0 sm:max-w-none"
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

      <Link
        href="/chat"
        className="invisible size-4 bg-transparent p-0 text-foreground hover:bg-transparent hover:text-muted-foreground"
      >
        <SquarePen className="size-4" />
      </Link>
    </>
  );
}
