import { Button } from "../ui/button";
import { Paperclip, StopCircle, ArrowUp } from "lucide-react";

export function InputActions({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="absolute bottom-1.5 right-1.5 flex gap-1">
      <Button type="button" variant="ghost" className="size-7 p-0">
        <Paperclip className="size-4 shrink-0" />
      </Button>
      {isLoading ? (
        <Button type="button" className="size-7 p-0">
          <StopCircle className="size-5 shrink-0" />
        </Button>
      ) : (
        <Button type="submit" className="size-7 p-0">
          <ArrowUp className="size-5 shrink-0" />
        </Button>
      )}
    </div>
  );
}
