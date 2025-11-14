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
          <SidebarMenuButton asChild size="lg">
            <div className="flex justify-between items-center w-full">
              {/* TEXTO SUAVE */}
              <span
                className={`
                  truncate font-semibold
                  transition-all duration-300 ease-in-out
                  ${open ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 ml-[-10px]"}
                `}
              >
                CASHTRACK
              </span>

              {/* TRIGGER DESKTOP */}
              <div className="hidden xl:block">
                <SidebarTrigger />
              </div>

              {/* TRIGGER MOBILE */}
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
