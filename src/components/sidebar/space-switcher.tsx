"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { Icon, type IconName } from "../icon";
import { NewSpaceButton } from "./new-space-button";

export function SpaceSwitcher() {
  const { isMobile } = useSidebar();
  const { data: user } = api.users.getCurrent.useQuery();
  const [activeId, setActiveId] = useState(user?.activeSpaceId);

  const activeTeam = user?.spaces.find((space) => space.id === activeId);
  const utils = api.useUtils();
  const { mutate: updateActiveSpace } = api.users.updateActiveSpace.useMutation(
    {
      onSuccess: async () => {
        await Promise.all([
          utils.users.getCurrent.invalidate(),
          utils.spaces.getCurrent.invalidate(),
        ]);
      },
    },
  );

  useEffect(() => {
    if (user?.activeSpaceId) {
      setActiveId(user.activeSpaceId);
    }
  }, [user?.activeSpaceId]);

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
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeTeam?.icon && (
                  <Icon name={activeTeam.icon as IconName} className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam?.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Spaces
            </DropdownMenuLabel>
            {user?.spaces.map((space, index) => (
              <DropdownMenuItem
                key={space.id}
                onClick={() => {
                  setActiveId(space.id);
                  updateActiveSpace({ spaceId: space.id });
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {space.icon && (
                    <Icon
                      name={space.icon as IconName}
                      className="size-4 shrink-0"
                    />
                  )}
                </div>
                {space.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <NewSpaceButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
