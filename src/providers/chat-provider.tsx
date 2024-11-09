"use client";

import React, { createContext, useRef, useState } from "react";

interface ChatContextType {
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  countRef: React.MutableRefObject<number>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined,
);

export const ChatProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const countRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{
        isDragging,
        setIsDragging,
        countRef,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
