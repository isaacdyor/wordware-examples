import { api } from "@/trpc/react";
import { type ConversationWithMessages } from "@/types/conversations";
import { useEffect } from "react";
import { useStream } from "./use-stream";

export function useChat({
  conversation,
}: {
  conversation: ConversationWithMessages | undefined | null;
}) {
  const utils = api.useUtils();

  const { fetchStream, streamedContent, setStreamedContent, isCompleted } =
    useStream();

  const { mutate } = api.conversations.addMessage.useMutation({
    onSuccess: async () => {
      await utils.conversations.getById.invalidate();
      setStreamedContent("");
    },
  });

  useEffect(() => {
    if (isCompleted && streamedContent !== "") {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  return { fetchStream, streamedContent };
}
