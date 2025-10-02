"use client";

import { ArrowRightLeftIcon, LayoutDashboardIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/lib/ui/sidebar";
import routes from "@/utils/routes";

export default function NavProjects() {
  const projects = [
    {
      name: "Dashboard",
      url: routes.finance.dashboard,
      icon: LayoutDashboardIcon,
    },
    {
      name: "Transações",
      url: routes.finance.transactions,
      icon: ArrowRightLeftIcon,
    },
  ];
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-lg">Menu</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild={true}>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
