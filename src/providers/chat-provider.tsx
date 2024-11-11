"use client";

import React, { createContext, useRef, useState } from "react";

interface ChatContextType {
  pageDragging: boolean;
  setPageDragging: React.Dispatch<React.SetStateAction<boolean>>;
  countRef: React.MutableRefObject<number>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  files: string[];
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined,
);

export const ChatProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [pageDragging, setPageDragging] = useState<boolean>(false);
  const countRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<string[]>([]);

  return (
    <ChatContext.Provider
      value={{
        pageDragging,
        setPageDragging,
        countRef,
        isLoading,
        setIsLoading,
        files,
        setFiles,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
