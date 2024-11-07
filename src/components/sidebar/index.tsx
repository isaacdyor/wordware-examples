"use client";

import {
  AudioLines,
  AudioWaveform,
  Bot,
  Command,
  File,
  GalleryVerticalEnd,
  Image,
  MessageCircle,
  Mic,
  Table,
  Upload,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Chat",
      url: "/chat",
      icon: MessageCircle,
    },
    {
      title: "ReAct Agent",
      url: "/agent",
      icon: Bot,
    },
    {
      title: "Upload Audio",
      url: "/upload-audio",
      icon: Mic,
    },
    {
      title: "Upload Images",
      url: "/upload-images",
      icon: Upload,
    },
    {
      title: "Upload Files",
      url: "/upload-files",
      icon: File,
    },
    {
      title: "Generate Audio",
      url: "/generate-audio",
      icon: AudioLines,
    },
    {
      title: "Generate Images",
      url: "/generate-images",
      icon: Image,
    },
    {
      title: "Structured Output",
      url: "/structured-output",
      icon: Table,
    },
  ],
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
