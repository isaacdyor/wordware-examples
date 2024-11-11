"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useChatContext } from "@/hooks/use-chat-context";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type Conversation } from "@prisma/client";
import { FileUpload } from "./file-upload";
import { InputActions } from "./input-actions";

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

  const { pageDragging, setIsLoading, isLoading } = useChatContext();

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
    setIsLoading(true);

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
    <div
      className={cn(
        "mx-auto flex w-full max-w-2xl flex-col rounded-lg lg:max-w-3xl",
        pageDragging && "border border-b-0",
      )}
    >
      {pageDragging && <FileUpload />}
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
                  <div className="relative">
                    <AutosizeTextarea
                      placeholder="Send a message..."
                      minHeight={90}
                      maxHeight={300}
                      className={cn(
                        "w-full resize-none bg-sidebar pr-16",
                        pageDragging && "border-x-0",
                      )}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      {...field}
                    />

                    <InputActions isLoading={isLoading} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
