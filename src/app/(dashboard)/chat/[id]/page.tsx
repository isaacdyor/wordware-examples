import { ChatDetail } from "@/components/chat/chat-detail";
import { api, HydrateClient } from "@/trpc/server";

interface ChatPageProps {
  params: { id: Promise<string> };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const id = await params.id;
  await api.conversations.getById.prefetch({ id });

  return (
    <HydrateClient>
      <ChatDetail />
    </HydrateClient>
  );
}
