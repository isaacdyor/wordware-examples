import { ChatDetail } from "@/components/chat/chat-detail";
import { ChatDetailTopbar } from "@/components/chat/chat-detail-topbar-content";
import { Topbar } from "@/components/sidebar/topbar";
import { ChatProvider } from "@/providers/chat-provider";
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
      <ChatProvider>
        <Topbar topbarContent={<ChatDetailTopbar id={id} />}>
          <ChatDetail />
        </Topbar>
      </ChatProvider>
    </HydrateClient>
  );
}
