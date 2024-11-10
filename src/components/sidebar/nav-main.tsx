"use client";

import { Bot } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useParams } from "next/dist/client/components/navigation";
import { cn } from "@/lib/utils";

export function NavMain() {
  const { data: space } = api.spaces.getCurrent.useQuery();

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
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
