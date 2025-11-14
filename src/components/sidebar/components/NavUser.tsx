"use client";

import { useState } from "react";
import { Bell, ChevronsUpDown, Settings } from "lucide-react";

import { useViewer } from "@/lib/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdownMenu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/lib/ui/sidebar";

import LogoutButton from "@/components/sidebar/components/LogoutButton";
import EditUserDialog from "@/app/finance/transaction/[[...id]]/components/group/ChangePasswordDialog";

export default function NavUser() {
  const viewer = useViewer();
  const { isMobile } = useSidebar();

  const [openChangePassword, setOpenChangePassword] = useState(false);

  const user = {
    name: viewer?.name || "",
    email: viewer?.email || "",
  };

  return (
    <SidebarMenu>
      <EditUserDialog
        isOpen={openChangePassword}
        setIsOpen={setOpenChangePassword}
      />

      <SidebarMenuItem className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild={true}>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 border">
                <AvatarImage alt={user.name} />
                <AvatarFallback className="text-xl">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt={user.name} />
                  <AvatarFallback className="text-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="flex space-x-2">
                <Bell size={20} />
                <span className="text-lg">Notificações</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex space-x-2"
                onSelect={() => setOpenChangePassword(true)}
              >
                <Settings size={20} />
                <span className="text-lg">Configuração</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
