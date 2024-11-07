import { type ConversationWithMessages } from "@/types/conversations";
import { useEffect } from "react";
import { useStream } from "./use-stream";

export function useFirstResponse(
  conversation: ConversationWithMessages | undefined | null,
) {
  const { fetchStream, streamedContent } = useStream(
    "4cfc2a23-2a4e-4038-a452-ac74c1faaa82",
    {
      message: conversation?.messages[0]?.content,
    },
  );
  useEffect(() => {
    if (!conversation) return;

    const shouldTriggerAIResponse =
      conversation.messages.length === 1 &&
      conversation.messages[0]?.role === "USER";

    if (shouldTriggerAIResponse) {
      void fetchStream();
    }
  }, [conversation, fetchStream]);
  return { streamedContent };
}
