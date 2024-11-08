import { NewChatInput } from "@/components/chat/new-chat-input";

export default function ChatPage() {
  return (
    <div className="flex h-screen flex-col items-center gap-4 px-8 pt-56">
      <h1 className="text-center text-xl font-bold lg:text-3xl">
        What Can I Help You With?
      </h1>
      <NewChatInput />
    </div>
  );
}
