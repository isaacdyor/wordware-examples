import { useChatContext } from "@/hooks/use-chat-context";
import { useUpload } from "@/hooks/use-upload";
import { cn } from "@/lib/utils";
import { CloudUpload, Loader2, X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { FilePreview } from "./file-preview";

export function FileUpload() {
  const [dropzoneDragging, setDropzoneDragging] = useState(false);
  const localDragCounter = useRef(0);
  const { countRef, setPageDragging, pageDragging, files } = useChatContext();
  const { handleUpload, uploading } = useUpload();

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    await handleUpload(file);
  };

  const showFileUpload = pageDragging || files.length > 0;

  return (
    showFileUpload && (
      <div className="h-40 rounded-t-md border border-b-0 bg-sidebar">
        {pageDragging ? (
          <div className="relative h-full">
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
                    "opacity-100 hover:bg-accent",
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
            <div className="absolute right-1 top-1 z-10 cursor-pointer rounded-full p-1 text-muted-foreground hover:bg-accent">
              <X className="size-4" onClick={() => setPageDragging(false)} />
            </div>
          </div>
        ) : (
          <div className="relative flex h-full w-full">
            <div className="absolute inset-0">
              <div className="flex h-full gap-2 overflow-x-auto overflow-y-hidden p-3">
                {files.map((file) => (
                  <FilePreview key={file.url} file={file} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
