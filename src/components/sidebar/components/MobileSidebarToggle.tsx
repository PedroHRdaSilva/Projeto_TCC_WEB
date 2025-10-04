"use client";

import { SidebarTrigger, useSidebar } from "@/lib/ui/sidebar";

export default function MobileSidebarToggle() {
  const { open, setOpen } = useSidebar();

  return <SidebarTrigger className="h-5 w-5" onClick={() => setOpen(!open)} />;
}
