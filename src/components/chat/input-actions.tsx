import { useUpload } from "@/hooks/use-upload";
import { ArrowUp, Paperclip, StopCircle } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";

export function InputActions({ isGenerating }: { isGenerating: boolean }) {
  const { handleUpload } = useUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleUpload(file);
      e.target.value = "";
    }
  };

  return (
    <div className="absolute bottom-1.5 right-1.5 flex gap-1">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="ghost"
        className="size-7 p-0"
        onClick={handleFileClick}
      >
        <Paperclip className="size-4 shrink-0" />
      </Button>
      {isGenerating ? (
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
