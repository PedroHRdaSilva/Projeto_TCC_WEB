"use client";

import { X } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/lib/ui/sidebar";

export default function TeamSwitcher() {
  const { open, setOpen } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
          <SidebarMenuButton asChild={true} size="lg">
            <div className="flex justify-between">
              {open && (
                <div className="hidden items-center space-x-3 text-xl xl:flex">
                  {/* <BrandIcon height={40} width={40} /> */}
                  <span className="truncate font-semibold">CASHTRACK</span>
                </div>
              )}
              <div className="flex items-center space-x-3 text-xl xl:hidden">
                {/* <BrandIcon height={40} width={40} /> */}
                <span className="truncate font-semibold">CASHTRACK</span>
              </div>
              <SidebarTrigger></SidebarTrigger>
              <div className="rounded-full border xl:hidden">
                <SidebarTrigger onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </SidebarTrigger>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
