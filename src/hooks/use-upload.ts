import { useState } from "react";
import { type PutBlobResult } from "@vercel/blob";
import { useChatContext } from "./use-chat-context";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const { setFiles, setPageDragging } = useChatContext();

  const handleImageUrl = (url: string) => {
    setFiles((prevFiles) => [...prevFiles, url]);
    setPageDragging(false);
  };

  const handleUpload = async (file: File | null) => {
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
  };

  return { handleUpload, uploading };
}
