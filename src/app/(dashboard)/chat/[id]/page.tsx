import { ChatDetail } from "@/components/chat/chat-detail";
import { api, HydrateClient } from "@/trpc/server";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  await api.conversations.getById.prefetch({ id });

  return (
    <HydrateClient>
      <ChatDetail />
    </HydrateClient>
  );
}
