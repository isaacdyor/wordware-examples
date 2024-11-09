"use client";

import { FileUpload } from "@/components/file-upload";
import { useState } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function UploadImagesPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(
    "https://nnboofnlro4su4lg.public.blob.vercel-storage.com/UY9lvaY-zoLP01uRcrMJCOO6FaLVOoqeIO1z65.png",
  );
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 lg:max-w-4xl">
      {imageUrl ? (
        <div className="relative flex flex-col gap-8 rounded-lg border border-dashed p-4">
          <Button
            variant="outline"
            className="absolute right-2 top-2 size-5 rounded-full p-0"
            onClick={() => setImageUrl(null)}
          >
            <X className="h-4 w-4" />
          </Button>

          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={1000}
            height={1000}
          />
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm text-muted-foreground">Upload succesful</p>
            <Check className="h-4 w-4 text-green-500" />
          </div>
        </div>
      ) : (
        <FileUpload type="image" handleImageUrl={setImageUrl} />
      )}
    </div>
  );
}
