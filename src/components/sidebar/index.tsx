"use client";

import * as React from "react";

import { NavUser } from "@/components/sidebar/nav-user";
import { SpaceSwitcher } from "@/components/sidebar/space-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { NavMain } from "./nav-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SpaceSwitcher />
      </SidebarHeader>
      <SidebarGroup>
        <Link href="/chat">
          <SidebarMenuButton tooltip="Create Chat">
            <Plus />
            <span>Create Chat</span>
          </SidebarMenuButton>
        </Link>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
