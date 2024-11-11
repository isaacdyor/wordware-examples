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
import { api } from "@/trpc/react";
import { ArrowUp, Bitcoin, Bot, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const FormSchema = z.object({
  message: z.string().min(1),
});

export function NewChatInput() {
  const { data: user } = api.users.getCurrent.useQuery();

  const utils = api.useUtils();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  const { mutate } = api.conversations.create.useMutation({
    onSuccess: (data: { id: string }) => {
      void utils.users.getCurrent.invalidate();
      router.push(`/chat/${data.id}`);
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!user) return;
    mutate({
      conversation: {
        name: "New Chat",
        user: { connect: { id: user.id } },
      },
      message: data.message,
    });
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full justify-center"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full max-w-2xl">
                <FormControl>
                  <div className="relative">
                    <AutosizeTextarea
                      placeholder="Ask me anything..."
                      minHeight={100}
                      maxHeight={200}
                      className="w-full resize-none border-2 bg-sidebar pr-12"
                      onKeyDown={handleKeyDown}
                      {...field}
                    />
                    <Button
                      type="submit"
                      className="absolute bottom-1.5 right-1.5 size-7 p-0"
                    >
                      <ArrowUp className="size-5 shrink-0" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={() => onSubmit({ message: "News on the election" })}
          variant="outline"
          className=""
          size="sm"
        >
          <Globe className="mr-2 h-4 w-4 text-blue-500" />
          News on the election
        </Button>
        <Button
          onClick={() => onSubmit({ message: "How to build an AI agent" })}
          variant="outline"
          className=""
          size="sm"
        >
          <Bot className="mr-2 h-4 w-4 text-purple-500" />
          How to build an AI agent
        </Button>
        <Button
          onClick={() => onSubmit({ message: "Price of Bitcoin" })}
          variant="outline"
          className=""
          size="sm"
        >
          <Bitcoin className="mr-2 h-4 w-4 text-[#f7931a]" />
          Price of Bitcoin
        </Button>
      </div>
    </div>
  );
}
