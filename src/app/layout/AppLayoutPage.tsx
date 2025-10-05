import React from "react";

import SidebarNew from "@/components/sidebar/SidebarNew";
import { cn } from "@/lib/utils/utils";

interface AppLayoutPageProps {
  className?: string;
  children: React.ReactNode;
}

export default function AppLayoutPage({
  className,
  children,
}: AppLayoutPageProps) {
  return (
    <div className="flex h-full w-screen flex-col bg-secondary lg:h-screen lg:flex-row">
      <SidebarNew />

      <div className={cn("w-full overflow-hidden p-4 lg:p-6", className)}>
        {children}
      </div>
    </div>
  );
}
