"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

const FormSchema = z.object({
  message: z.string().min(1),
});

export function NewChatInput() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  const { mutate } = api.conversations.create.useMutation({
    onSuccess: (data: { id: string }) => {
      router.push(`/chat/${data.id}`);
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    mutate({ conversation: { userId: "unnecessary" }, message: data.message });
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
            <FormItem className="w-full max-w-xl">
              <FormControl>
                <AutosizeTextarea
                  placeholder="Ask me anything..."
                  minHeight={100}
                  maxHeight={200}
                  className="w-full resize-none border-2 text-lg"
                  onKeyDown={handleKeyDown}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
