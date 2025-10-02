"use client";

import NavMain from "@/components/sidebar/components/NavMain";
import NavUser from "@/components/sidebar/components/NavUser";
import TeamSwitcher from "@/components/sidebar/components/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/lib/ui/sidebar";
import { cn } from "@/lib/utils/utils";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className={cn("flex flex-col bg-background")}
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
