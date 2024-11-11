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
import { type Conversation } from "@prisma/client";

export function NavMain() {
  const { data: user } = api.users.getCurrent.useQuery();

  const { isMobile } = useSidebar();

  const params = useParams();
  const id = params.id as string;

  const conversations = user?.conversations;
  if (conversations?.length === 0) return null;

  // Group conversations by date
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(now);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastMonth = new Date(now);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const groupedConversations = {
    today: conversations?.filter((conv) => {
      const updatedAt = new Date(conv.updatedAt);
      return updatedAt.toDateString() === now.toDateString();
    }),
    yesterday: conversations?.filter((conv) => {
      const updatedAt = new Date(conv.updatedAt);
      return updatedAt.toDateString() === yesterday.toDateString();
    }),
    lastWeek: conversations?.filter((conv) => {
      const updatedAt = new Date(conv.updatedAt);
      return updatedAt > lastWeek && updatedAt < yesterday;
    }),
    lastMonth: conversations?.filter((conv) => {
      const updatedAt = new Date(conv.updatedAt);
      return updatedAt > lastMonth && updatedAt < lastWeek;
    }),
    older: conversations?.filter((conv) => {
      const updatedAt = new Date(conv.updatedAt);
      return updatedAt < lastMonth;
    }),
  };

  // Helper function to render conversation items
  const renderConversationItem = (conversation: Conversation) => (
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
  );

  return (
    <>
      {groupedConversations.today && groupedConversations.today.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Today</SidebarGroupLabel>
          <SidebarMenu>
            {groupedConversations.today.map(renderConversationItem)}
          </SidebarMenu>
        </SidebarGroup>
      )}

      {groupedConversations.yesterday &&
        groupedConversations.yesterday.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Yesterday</SidebarGroupLabel>
            <SidebarMenu>
              {groupedConversations.yesterday.map(renderConversationItem)}
            </SidebarMenu>
          </SidebarGroup>
        )}

      {groupedConversations.lastWeek &&
        groupedConversations.lastWeek.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Last Week</SidebarGroupLabel>
            <SidebarMenu>
              {groupedConversations.lastWeek.map(renderConversationItem)}
            </SidebarMenu>
          </SidebarGroup>
        )}

      {groupedConversations.lastMonth &&
        groupedConversations.lastMonth.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Last Month</SidebarGroupLabel>
            <SidebarMenu>
              {groupedConversations.lastMonth.map(renderConversationItem)}
            </SidebarMenu>
          </SidebarGroup>
        )}

      {groupedConversations.older && groupedConversations.older.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Older</SidebarGroupLabel>
          <SidebarMenu>
            {groupedConversations.older.map(renderConversationItem)}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
}
