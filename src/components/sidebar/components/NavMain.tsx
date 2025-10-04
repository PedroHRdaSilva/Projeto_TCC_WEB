"use client";

import { ArrowRightLeftIcon, LayoutDashboardIcon } from "lucide-react";

import { Collapsible, CollapsibleTrigger } from "@/lib/ui/collapsible";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/lib/ui/sidebar";
import routes from "@/utils/routes";

export default function NavMain() {
  const items = [
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
    <SidebarGroup>
      <SidebarMenu className="flex space-y-2">
        {items.map((item) => (
          <Collapsible
            key={item.name}
            asChild={true}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild={true}>
                <SidebarMenuButton tooltip={item.name}>
                  <a href={item.url} className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 xl:h-6 xl:w-6" />
                    <span className="xl:text-lg">{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
