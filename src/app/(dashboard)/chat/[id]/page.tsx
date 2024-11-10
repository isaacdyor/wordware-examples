import { ChatDetail } from "@/components/chat/chat-detail";
import { ChatDetailTopbarContent } from "@/components/chat/chat-detail-topbar-content";
import { TopBar } from "@/components/sidebar/topbar";
import { ChatProvider } from "@/providers/chat-provider";
import { api, HydrateClient } from "@/trpc/server";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const conversation = await api.conversations.getById({ id });
  await api.conversations.getById.prefetch({ id });

  return (
    <HydrateClient>
      <ChatProvider>
        <TopBar
          topbarContent={
            <ChatDetailTopbarContent
              conversationName={conversation?.name ?? ""}
            />
          }
        >
          <ChatDetail />
        </TopBar>
      </ChatProvider>
    </HydrateClient>
  );
}
