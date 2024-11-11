import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyIcon, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function MessageActions({ message }: { message: string }) {
  return (
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
  );
}
