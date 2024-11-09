"use client";

import {
  AudioLines,
  AudioWaveform,
  Bot,
  Command,
  File,
  GalleryVerticalEnd,
  Image,
  Mic,
  Table,
  Upload,
} from "lucide-react";
import * as React from "react";

import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Conversation } from "@prisma/client";
import { NavMain } from "./nav-main";

// This is sample data.
const data = {
  examplesNav: [
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

export function AppSidebar({
  conversations,
  ...props
}: React.ComponentProps<typeof Sidebar> & { conversations: Conversation[] }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain conversations={conversations} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
