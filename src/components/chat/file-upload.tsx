import { useChatContext } from "@/hooks/use-chat-context";
import { useUpload } from "@/hooks/use-upload";
import { cn } from "@/lib/utils";
import { CloudUpload, Loader2, X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

export function FileUpload() {
  const [dropzoneDragging, setDropzoneDragging] = useState(false);
  const localDragCounter = useRef(0);
  const { countRef, setPageDragging, pageDragging, files } = useChatContext();
  const { handleUpload, uploading } = useUpload();

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    await handleUpload(file);
  };

  return (
    <div className="relative h-40">
      {files.length > 0 && !pageDragging && (
        <div className="flex h-full w-full gap-2">
          {files.map((file) => (
            <div key={file}>{file}</div>
          ))}
        </div>
      )}
      <div className="h-full">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="relative flex h-full flex-col items-center justify-center">
            <div
              className="absolute z-[5] h-full w-full rounded-md"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDropzoneDragging(true);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                localDragCounter.current++;
                countRef.current++;
                setDropzoneDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                localDragCounter.current--;
                countRef.current--;
                if (localDragCounter.current === 0) {
                  setDropzoneDragging(false);
                }
              }}
              onDrop={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                localDragCounter.current = 0;
                countRef.current = 0;
                setDropzoneDragging(false);
                const file = e.dataTransfer.files?.[0] ?? null;
                await handleUpload(file);
              }}
            />
            <div
              className={cn(
                "absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all",
                dropzoneDragging && "border-2 border-primary",
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
        <X className="size-4" onClick={() => setPageDragging(false)} />
      </div>
    </div>
  );
}
