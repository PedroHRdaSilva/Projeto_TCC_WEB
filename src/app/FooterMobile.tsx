import React from "react";

import { cn } from "@/lib/utils/utils";

interface AppLayoutPageProps {
  className?: string;
  children: React.ReactNode;
}

export default function FooterMobile({
  className,
  children,
}: AppLayoutPageProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-50 w-full border border-border bg-secondary/90 lg:hidden",
        className
      )}
    >
      <div className="w-full">{children}</div>
    </div>
  );
}
