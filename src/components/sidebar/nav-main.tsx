"use client";

import { Bot, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Conversation } from "@prisma/client";

export function NavMain({ conversations }: { conversations: Conversation[] }) {
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
