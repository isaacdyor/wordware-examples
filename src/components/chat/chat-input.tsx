"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { type Conversation } from "@prisma/client";

const FormSchema = z.object({
  message: z.string().min(1),
});

export function ChatInput({ conversation }: { conversation: Conversation }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const utils = api.useUtils();

  const { fetchStream } = useStream();

  const { mutate } = api.conversations.addMessage.useMutation({
    async onMutate(newPost) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.conversations.getById.cancel();

      // Get the data from the queryCache
      const prevData = utils.conversations.getById.getData();

      // Optimistically update the data with our new post
      utils.conversations.getById.setData(
        { id: conversation.id },
        (old) =>
          old && {
            ...old,
            messages: [
              ...old.messages,
              {
                id: crypto.randomUUID(),
                createdAt: new Date(),
                updatedAt: new Date(),
                content: newPost.content,
                role: newPost.role,
                conversationId: conversation.id,
              },
            ],
          },
      );

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onSuccess: async (data: { content: string }) => {
      void utils.conversations.invalidate();
      // await fetchStream("4cfc2a23-2a4e-4038-a452-ac74c1faaa82", {
      //   message: data.content,
      // });
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    form.reset({ message: "" });
    mutate({
      content: data.message,
      role: "ASSISTANT",
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-center"
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
                  className="w-full resize-none"
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
  );
}
