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

export function NavMain() {
  return null;
  const { data: space } = api.spaces.getCurrent.useQuery();

  console.log(space);

  if (!space) return null;

  const conversations = space.conversations;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>
        {conversations.map((conversation) => (
          <Link href={`/chat/${conversation.id}`} key={conversation.id}>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={conversation.id}>
                <Bot />
                <span>{conversation.id}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
