import { type File } from "@/providers/chat-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useChatContext } from "@/hooks/use-chat-context";
import { Play, Pause } from "lucide-react";
import { useState } from "react";

export function FilePreview({ file }: { file: File }) {
  const { setFiles } = useChatContext();
  const extension = file.name.split(".").pop()?.toLowerCase();
  const type = extension
    ? ["jpg", "jpeg", "png", "gif", "webp"].includes(extension)
      ? "image"
      : ["mp3", "wav", "ogg", "m4a"].includes(extension)
        ? "audio"
        : "other"
    : "other";

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative h-full w-36 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
            {type === "image" && (
              <Image
                src={file.url}
                alt={file.name}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            )}
            {type === "audio" && (
              <div className="flex h-full items-center justify-center">
                <audio
                  id={`audio-${file.url}`}
                  src={file.url}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                <Button
                  variant="ghost"
                  className="size-10 p-0"
                  onClick={() => {
                    const audio = document.getElementById(
                      `audio-${file.url}`,
                    ) as HTMLAudioElement;
                    if (audio.paused) {
                      void audio.play();
                    } else {
                      void audio.pause();
                    }
                  }}
                >
                  {isPlaying ? (
                    <Pause className="size-8" />
                  ) : (
                    <Play className="size-8" />
                  )}
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              className="absolute right-0 top-0 size-6 p-0 hover:bg-transparent hover:text-muted-foreground"
              onClick={() => {
                setFiles((prevFiles) =>
                  prevFiles.filter((f) => f.url !== file.url),
                );
              }}
            >
              <X className="size-4" />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{file.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
