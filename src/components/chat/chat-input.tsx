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
import { useStreamLLM } from "@/hooks/use-stream-llm";
import { toast } from "sonner";

const FormSchema = z.object({
  message: z.string().min(1),
});

export function ChatInput({ conversation }: { conversation: Conversation }) {
  const { streamLLM } = useStreamLLM({ conversation });
  const { setIsGenerating } = useChatContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { pageDragging, isGenerating, files } = useChatContext();

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
      await streamLLM("4cfc2a23-2a4e-4038-a452-ac74c1faaa82", {
        message: data.content,
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isGenerating) {
      toast.error("You are already generating a response");
      return;
    }
    form.reset({ message: "" });
    setIsGenerating(true);
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
    <div>
      <FileUpload />
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
                        (pageDragging || files.length > 0) && "rounded-t-none",
                      )}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      {...field}
                    />

                    <InputActions isGenerating={isGenerating} />
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
