import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Pen } from "lucide-react";
import { Button } from "../../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { type Conversation } from "@prisma/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  name: z.string().min(1),
});

export function RenameButton({ conversation }: { conversation: Conversation }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: conversation.name,
    },
  });
  const utils = api.useUtils();

  const { mutate } = api.conversations.update.useMutation({
    onSuccess: async () => {
      await utils.spaces.getCurrent.invalidate();
      toast.success("Conversation renamed");
    },
  });

  const isMobile = useIsMobile();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    mutate({
      where: {
        id: conversation.id,
      },
      data: {
        name: data.name,
      },
    });
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
          <span>Rename</span>
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
                    <Input {...field} />
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
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
