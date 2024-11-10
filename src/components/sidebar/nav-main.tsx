"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { api } from "@/trpc/react";
import Link from "next/link";
import { useParams } from "next/dist/client/components/navigation";
import { cn } from "@/lib/utils";
import { Archive, MoreHorizontal, Pen, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";

export function NavMain() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: space } = api.spaces.getCurrent.useQuery();
  const utils = api.useUtils();

  const { mutate: deleteConversation } = api.conversations.delete.useMutation({
    onSuccess: async () => {
      await utils.spaces.getCurrent.invalidate();
      toast.success("Conversation deleted");
      setIsDeleting(false);
      setIsOpen(false);
    },
  });

  const { isMobile } = useSidebar();

  const params = useParams();
  const id = params.id as string;

  const conversations = space?.conversations;
  if (conversations?.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>
        {conversations?.map((conversation) => (
          <Link href={`/chat/${conversation.id}`} key={conversation.id}>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn(conversation.id === id && "bg-muted")}
                tooltip={conversation.name}
              >
                <span>{conversation.name}</span>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Pen className="text-muted-foreground" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="text-muted-foreground" />
                    <span>Archive</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex h-8 w-full justify-start gap-2 px-2 py-1.5 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-4 shrink-0" />
                        <span>Delete Project</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this conversation.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isDeleting}
                          className={buttonVariants({ variant: "destructive" })}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsDeleting(true);
                            deleteConversation({ id });
                          }}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
