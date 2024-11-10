"use client";

import { SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useRef, useEffect } from "react";

export function ChatDetailTopbarContent({
  conversationName,
}: {
  conversationName: string;
}) {
  const [title, setTitle] = useState(conversationName);
  const [width, setWidth] = useState(102);
  const measureRef = useRef<HTMLSpanElement>(null);

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
      <div className="relative">
        <span
          ref={measureRef}
          className="invisible absolute whitespace-pre px-3 py-0.5 text-sm"
          style={{ fontFamily: "inherit" }}
        >
          {title}
        </span>

        <Input
          placeholder="Chat name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-6 truncate border-none focus-visible:ring-0"
          style={{ width: `${width}px` }}
        />
      </div>

      <Button className="size-4 bg-background p-0 text-foreground hover:bg-background hover:text-muted-foreground">
        <SquarePen className="size-5" />
      </Button>
    </>
  );
}
