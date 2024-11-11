"use client";

import React, { createContext, useRef, useState } from "react";

export interface File {
  name: string;
  url: string;
}

interface ChatContextType {
  pageDragging: boolean;
  setPageDragging: React.Dispatch<React.SetStateAction<boolean>>;
  countRef: React.MutableRefObject<number>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined,
);

export const ChatProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [pageDragging, setPageDragging] = useState<boolean>(false);
  const countRef = useRef<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <ChatContext.Provider
      value={{
        pageDragging,
        setPageDragging,
        countRef,
        isGenerating,
        setIsGenerating,
        files,
        setFiles,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
