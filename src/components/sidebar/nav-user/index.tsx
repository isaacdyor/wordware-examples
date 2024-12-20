"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { api } from "@/trpc/react";
import { Logout } from "./logout";
import { ThemeToggle } from "./theme-toggle";

export function NavUser() {
  const { isMobile } = useSidebar();

  const { data: user } = api.users.getCurrent.useQuery();

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.image ?? undefined}
                  alt="Profile picture"
                />
                <AvatarFallback className="rounded-lg">
                  {user.email?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <p className="truncate font-semibold">{user.name}</p>

                <p className="truncate text-xs">{user.email}</p>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt="Profile picture"
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.email?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <p className="truncate font-semibold">{user.name}</p>

                  <p className="truncate text-xs">{user.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-default">
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-default">
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-default">
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-default">
                <Bell />
                Notifications
              </DropdownMenuItem>
              <ThemeToggle />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
