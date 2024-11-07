import { type Conversation, type Message } from "@prisma/client";

export type ConversationWithMessages = Conversation & {
  messages: Message[];
};
