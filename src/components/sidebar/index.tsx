"use client";

import * as React from "react";

import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Logo } from "../logo";
import { NavMain } from "./nav-main";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <Sidebar collapsible="icon">
        <SidebarHeader
          className={cn(
            "pb-6 transition-[padding] duration-200",
            isOpen && "pt-4",
          )}
        >
          <Link href="/">
            <Logo isClosed={!isOpen} className="ml-2 mt-0.5 fill-foreground" />
          </Link>
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
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
