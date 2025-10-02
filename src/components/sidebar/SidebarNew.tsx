import AppSidebar from "@/components/sidebar/components/AppSidebar";
import MobileSidebarToggle from "@/components/sidebar/components/MobileSidebarToggle";
import { SidebarInset, SidebarProvider } from "@/lib/ui/sidebar";

export default function SidebarNew() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-4 xl:hidden">
          <MobileSidebarToggle />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
