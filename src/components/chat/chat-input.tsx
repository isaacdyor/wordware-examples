"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { api } from "@/trpc/react";
import { type Conversation } from "@prisma/client";
import { ChatFileUpload } from "./chat-file-upload";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useChatContext } from "@/hooks/use-chat-context";

const FormSchema = z.object({
  message: z.string().min(1),
});

export function ChatInput({
  conversation,
  fetchStream,
}: {
  conversation: Conversation;
  fetchStream: (id: string, data: { message: string }) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { isDragging, setIsLoading } = useChatContext();

  const utils = api.useUtils();

  const { mutate } = api.conversations.addMessage.useMutation({
    async onMutate(newPost) {
      await utils.conversations.getById.cancel();

      const prevData = utils.conversations.getById.getData();

      utils.conversations.getById.setData({ id: conversation.id }, (old) => {
        if (!old) return old;

        const newMessage = {
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          content: newPost.content,
          role: newPost.role,
          conversationId: conversation.id,
        };

        return {
          ...old,
          messages: [...old.messages, newMessage],
        };
      });

      return { prevData };
    },
    onSuccess: async (data: { content: string }) => {
      void utils.conversations.invalidate();
      await fetchStream("4cfc2a23-2a4e-4038-a452-ac74c1faaa82", {
        message: data.content,
      });
      setIsLoading(false);
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setTimeout(() => {
      setIsLoading(true);
    }, 400);
    form.reset({ message: "" });
    mutate({
      content: data.message,
      role: "USER",
      conversation: {
        connect: {
          id: conversation?.id,
        },
      },
    });
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col rounded-lg border border-b-0 lg:max-w-3xl">
      {isDragging && <ChatFileUpload />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <AutosizeTextarea
                    placeholder="Ask me anything..."
                    minHeight={36}
                    maxHeight={150}
                    className={cn(
                      "w-full resize-none",
                      isDragging && "border-x-0",
                    )}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
