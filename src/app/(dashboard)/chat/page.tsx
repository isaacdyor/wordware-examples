import { NewChatInput } from "@/components/chat/new-chat-input";
import { Topbar } from "@/components/sidebar/topbar";

export default function ChatPage() {
  return (
    <Topbar>
      <div className="flex h-[calc(100vh-100px)] flex-col items-center gap-8 px-8 pt-56">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-center text-2xl font-bold sm:text-4xl md:text-2xl lg:text-5xl">
            What Can I Help You With?
          </h1>
          <p className="text-center text-lg text-muted-foreground">
            I am a multimodal AI model with access to the internet
          </p>
        </div>

        <NewChatInput />
      </div>
    </Topbar>
  );
}
