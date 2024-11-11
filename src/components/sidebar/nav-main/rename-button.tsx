import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Conversation } from "@prisma/client";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../ui/button";

const FormSchema = z.object({
  name: z.string().min(1),
});

export function RenameButton({ conversation }: { conversation: Conversation }) {
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: conversation.name,
    },
  });
  const utils = api.useUtils();

  const { mutate } = api.conversations.update.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.conversations.getById.invalidate({ id: conversation.id }),
      ]);
      toast.success("Conversation renamed");
      setIsSaving(false);
    },
  });

  const isMobile = useIsMobile();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSaving(true);
    mutate({
      where: {
        id: conversation.id,
      },
      data: {
        name: data.name,
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-full justify-start gap-2 px-2 py-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <Pen className="size-4 shrink-0 text-muted-foreground" />
          <span className="font-normal">Rename</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        side={isMobile ? "top" : "right"}
        align="start"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} onKeyDown={handleKeyDown} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                size="sm"
                type="submit"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
