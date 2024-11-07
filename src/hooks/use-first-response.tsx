import { type ConversationWithMessages } from "@/types/conversations";
import { useEffect } from "react";
import { useStream } from "./use-stream";
import { api } from "@/trpc/react";

export function useFirstResponse(
  conversation: ConversationWithMessages | undefined | null,
) {
  const utils = api.useUtils();

  const { fetchStream, streamedContent, isCompleted } = useStream(
    "4cfc2a23-2a4e-4038-a452-ac74c1faaa82",
    {
      message: conversation?.messages[0]?.content,
    },
  );

  const { mutate } = api.conversations.addMessage.useMutation({
    onSuccess: async () => {
      await utils.conversations.getById.invalidate();
    },
  });

  useEffect(() => {
    if (!conversation) return;

    const shouldTriggerAIResponse =
      conversation.messages.length === 1 &&
      conversation.messages[0]?.role === "USER" &&
      !isCompleted;

    if (shouldTriggerAIResponse) {
      void fetchStream();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, isCompleted]);

  useEffect(() => {
    if (isCompleted) {
      mutate({
        id: conversation?.id,
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

  return { streamedContent, isCompleted };
}
