import { api } from "@/trpc/react";
import { type Conversation } from "@prisma/client";
import { useCallback, useState } from "react";
import { useChatContext } from "./use-chat-context";

export function useStreamLLM({
  conversation,
}: {
  conversation: Conversation | undefined | null;
}) {
  const { setIsGenerating } = useChatContext();
  const [streamedContent, setStreamedContent] = useState<string>("");

  const utils = api.useUtils();

  const { mutate } = api.conversations.addMessage.useMutation({
    onSuccess: async () => {
      await utils.conversations.getById.invalidate();
      setStreamedContent("");
    },
  });

  const addMessage = useCallback(() => {
    mutate({
      content: streamedContent,
      role: "ASSISTANT",
      conversation: {
        connect: {
          id: conversation?.id,
        },
      },
    });
  }, [mutate, streamedContent, conversation?.id]);

  const streamLLM = useCallback(
    async (appSlug: string, inputs: Record<string, unknown>) => {
      try {
        const response = await fetch(`/api/stream/${appSlug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: inputs,
          }),
        });

        if (!response.ok || !response.body) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        let currentData = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            setIsGenerating(false);
            addMessage();
            break;
          }

          const chunk = new TextDecoder().decode(value);
          currentData += chunk;

          const events = currentData.split("\n\nevent: ");
          currentData = events.pop() ?? "";

          for (const event of events) {
            const jsonStr = event
              .split("\n")
              .filter((line) => line.startsWith("data: "))
              .map((line) => line.replace("data: ", ""))
              .join("");

            if (!jsonStr) continue;
            const parsedData = JSON.parse(jsonStr) as Record<string, unknown>;
            try {
              if (parsedData.type === "chunk") {
                const newContent = (parsedData.content as string) || "";
                setStreamedContent((prev) => prev + newContent);
              }
            } catch (error) {
              console.error("Failed to parse stream data:", error);
            }
          }
        }
      } catch (error) {
        console.error("Failed to generate AI response:", error);
      }
    },
    [addMessage, setIsGenerating],
  );

  return {
    streamLLM,
    streamedContent,
  };
}
