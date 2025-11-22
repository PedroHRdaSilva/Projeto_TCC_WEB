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

import { useEffect, useState } from "react";

export default function TeamSwitcher() {
  const { open } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const showText = isMobile ? true : open;

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
          <SidebarMenuButton asChild size="lg">
            <div className="flex justify-between items-center w-full">
              <span
                className={`
                  truncate font-semibold
                  transition-all duration-300 ease-in-out
                  ${showText ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 ml-[-10px]"}
                `}
              >
                CASHTRACK
              </span>

              {/* desktop trigger */}
              <div className="hidden xl:block">
                <SidebarTrigger />
              </div>

              {/* mobile trigger */}
              <div className="rounded-full border xl:hidden">
                <SidebarTrigger>
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
