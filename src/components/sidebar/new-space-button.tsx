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

import { type IconName } from "@/components/icon";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";

import { Icon } from "@/components/icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  name: z.string().min(1),
  icon: z.string() as z.ZodType<IconName>,
});

const AVAILABLE_ICONS: IconName[] = [
  "Briefcase", // For work/business spaces
  "House", // For personal/home spaces
  "GraduationCap", // For education/learning spaces
  "Heart", // For health/wellness spaces
  "Users", // For social/community spaces
  "Palette", // For creative/art spaces
  "Plane", // For travel spaces
  "Book", // For reading/library spaces
  "Gamepad2", // For gaming spaces
  "Dumbbell", // For fitness spaces
  "Code", // For development spaces
  "Music", // For music/audio spaces
  "Camera", // For photography spaces
  "Utensils", // For cooking/food spaces
  "Leaf", // For outdoor/nature spaces
];

export function NewSpaceButton() {
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "Work",
      icon: "BriefcaseBusiness",
    },
  });
  const utils = api.useUtils();

  const { mutate: updateActiveSpace } = api.users.updateActiveSpace.useMutation(
    {
      onSuccess: async () => {
        await utils.users.getCurrent.invalidate();
        toast.success("Space created");
        setIsSaving(false);
      },
    },
  );

  const { mutate } = api.spaces.create.useMutation({
    onSuccess: async (data) => {
      updateActiveSpace({ spaceId: data.id });
    },
  });

  const isMobile = useIsMobile();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSaving(true);
    mutate({
      icon: data.icon,
      name: data.name,
      user: {
        connect: {
          userId: "unecessary",
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
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex w-full justify-start gap-2 p-2" variant="ghost">
          <div className="flex size-6 items-center justify-center rounded-md border">
            <Plus className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground">Add space</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        side={isMobile ? "top" : "right"}
        align="center"
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
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an icon">
                          {field.value && (
                            <div className="flex items-center gap-2 px-0">
                              <Icon name={field.value} />
                              <span>{field.value}</span>
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {AVAILABLE_ICONS.map((iconName) => (
                            <SelectItem
                              key={iconName}
                              value={iconName}
                              className="px-3 py-2"
                            >
                              <div className="flex items-center gap-2">
                                <Icon name={iconName} />
                                <span>{iconName}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
