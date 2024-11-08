import { useState } from "react";

import { type ConversationWithMessages } from "@/types/conversations";
import { useEffect } from "react";
import { useStream } from "./use-stream";
import { api } from "@/trpc/react";

export function useFirstResponse(
  conversation: ConversationWithMessages | undefined | null,
) {
  const utils = api.useUtils();
  const [invalidated, setInvalidated] = useState(false);

  const { fetchStream, streamedContent, isCompleted } = useStream();

  const { mutate } = api.conversations.addMessage.useMutation({
    onSuccess: async () => {
      await utils.conversations.getById.invalidate();
      setInvalidated(true);
    },
  });

  useEffect(() => {
    if (!conversation) return;

    const shouldTriggerAIResponse =
      conversation.messages.length === 1 &&
      conversation.messages[0]?.role === "USER" &&
      !isCompleted;

    if (shouldTriggerAIResponse) {
      void fetchStream("4cfc2a23-2a4e-4038-a452-ac74c1faaa82", {
        message: conversation?.messages[0]?.content,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, isCompleted]);

  useEffect(() => {
    if (isCompleted) {
      mutate({
        content: streamedContent,
        role: "ASSISTANT",
        conversation: {
          connect: {
            id: conversation?.id,
          },
        },
      });
    }
  }, [conversation?.id, isCompleted, mutate, streamedContent]);

  return { streamedContent, invalidated };
}
