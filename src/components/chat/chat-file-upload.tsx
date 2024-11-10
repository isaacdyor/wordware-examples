import { useChatContext } from "@/hooks/use-chat-context";
import { cn } from "@/lib/utils";
import { type PutBlobResult } from "@vercel/blob";
import { CloudUpload, Loader2, X } from "lucide-react";
import { type ChangeEvent, useCallback, useRef, useState } from "react";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function ChatFileUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const localDragCounter = useRef(0);
  const { countRef, setIsDragging } = useChatContext();

  const handleImageUrl = useCallback((url: string) => {
    console.log(url);
  }, []);

  const handleUpload = useCallback(
    async (file: File | null) => {
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        console.error("File size too big (max 50MB)");
        return;
      }

      setUploading(true);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "content-type": file.type || "application/octet-stream" },
          body: file,
        });

        if (response.ok) {
          const { url } = (await response.json()) as PutBlobResult;
          handleImageUrl(url);
          console.log(url);
        } else {
          const error = await response.text();
          console.error(error);
        }
      } catch (error) {
        console.error("An error occurred while uploading the file.", error);
      } finally {
        setUploading(false);
      }
    },
    [handleImageUrl],
  );

  const onChangeFile = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0] ?? null;
      await handleUpload(file);
    },
    [handleUpload],
  );

  return (
    <div className="relative h-40">
      <div className="h-full">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="relative flex h-full flex-col items-center justify-center">
            <div
              className="absolute z-[5] h-full w-full rounded-md"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(true);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                localDragCounter.current++;
                countRef.current++;
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                localDragCounter.current--;
                countRef.current--;
                if (localDragCounter.current === 0) {
                  setDragActive(false);
                }
              }}
              onDrop={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                localDragCounter.current = 0;
                countRef.current = 0;
                setDragActive(false);
                const file = e.dataTransfer.files?.[0] ?? null;
                await handleUpload(file);
              }}
            />
            <div
              className={cn(
                "absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all",
                dragActive && "border-2 border-primary",
                "bg-background opacity-100 hover:bg-accent",
              )}
            >
              {uploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : (
                <CloudUpload className="h-8 w-8 text-muted-foreground" />
              )}
              <p className="mt-2 text-center text-sm font-semibold">
                {uploading
                  ? "Uploading..."
                  : "Drag and drop or click to upload."}
              </p>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Max file size: 50MB
              </p>
              <span className="sr-only">File upload</span>
            </div>
          </div>
        </label>
        <input
          id="file-upload"
          name="file"
          type="file"
          accept="*"
          className="sr-only"
          onChange={onChangeFile}
          disabled={uploading}
        />
      </div>
      <div className="absolute right-1 top-1 z-10 cursor-pointer rounded-full p-1 text-muted-foreground hover:bg-accent">
        <X className="size-4" onClick={() => setIsDragging(false)} />
      </div>
    </div>
  );
}
