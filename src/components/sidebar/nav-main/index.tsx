"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
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

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/dist/client/components/navigation";
import Link from "next/link";
import { ArchiveButton } from "./archive-button";
import { DeleteButton } from "./delete-button";
import { RenameButton } from "./rename-button";

export function NavMain() {
  const { data: space } = api.spaces.getCurrent.useQuery();

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
                  <RenameButton conversation={conversation} />
                  <ArchiveButton id={id} />

                  <DropdownMenuSeparator />
                  <DeleteButton id={id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
