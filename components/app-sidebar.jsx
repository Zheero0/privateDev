"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  LayoutDashboard,
  Folder,
  MessageSquarePlus,
  PenSquare,
  MessagesSquare,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Search,
  Sparkles,
  Building,
} from "lucide-react";

import Link from "next/link";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/authContext/auth";

// Sample data for teams, navMain, and projects.
const data = {
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "/dashboard",
    //   icon: LayoutDashboard,
    // },
    {
      title: "Search",
      url: "/search",
      icon: Search,
      items: [
        { title: "Find Job", url: "/search" },
        { title: "Directory", url: "/directory" },
        { title: "Saved Jobs", url: "/saved-jobs" },
      ],
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessagesSquare,
    },

    {
      title: "Post Job",
      url: "/post-job",
      icon: PenSquare,
    },
    {
      title: "Directory",
      url: "/directory",
      icon: Building,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  // Call useAuth to access the current user and subscription status
  const { currentUser, isProUser } = useAuth();

  // Prepare the user object to pass to NavUser
  const user = {
    name: currentUser?.displayName || "Guest",
    email: currentUser?.email || "No Email",
    avatar: currentUser?.photoURL || (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.121 17.804A8 8 0 0112 15a8 8 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
    ),
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/">
          <svg
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500"
          >
            <path
              d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="`">mkp</p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      {/* Conditionally render the upgrade section based on isProUser */}
      {!isProUser && (
        <div className="px-4 py-3 mx-3 mb-4 rounded-lg bg-gradient-to-r from-white to-gray-200 shadow-md group-data-[collapsible=icon]:hidden">
          <div className="mb-2">
            <span className="flex items-center gap-1 text-sm font-medium text-gray-800">
              <Sparkles className="h-4 w-4" />
              Upgrade to Pro
            </span>
            <p className="text-xs text-gray-600">
              Get access to all premium features
            </p>
          </div>
          <Link
            href="/pricing"
            className="block w-full py-2 text-center text-xs font-medium text-white bg-blue-500 hover:bg-blue-400 rounded-md transition-colors"
          >
            Upgrade Now
          </Link>
        </div>
      )}

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
