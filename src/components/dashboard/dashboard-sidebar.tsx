"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLogoutHandler, useUserGetMe } from "@/hooks";
import {
  customerRoutes,
  subStationManagerRoutes,
  technicianRoutes,
  zonalManagerRoutes,
} from "@/routes";
import type { IUserRole, TSidebarItems } from "@/types";

const sidebarRoutes: Partial<Record<IUserRole, TSidebarItems>> = {
  CUSTOMER: customerRoutes,
  TECHNICIAN: technicianRoutes,
  ZONE_MANAGER: zonalManagerRoutes,
  SUBSTATION_MANAGER: subStationManagerRoutes,
};

const roleLabels: Record<IUserRole, string> = {
  CUSTOMER: "Customer",
  TECHNICIAN: "Technician",
  ZONE_MANAGER: "Zonal Manager",
  SUBSTATION_MANAGER: "Substation Manager",
};

export function DashboardSidebar({ role }: { role: IUserRole }) {
  const pathname = usePathname();
  const routes = sidebarRoutes[role] ?? [];
  const { data } = useUserGetMe();
  const user = data?.data;
  const { handleLogout, isPending } = useLogoutHandler();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-1"
          aria-label="Back to home"
        >
          <Logo width={150} height={44} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <div className="px-2 py-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {roleLabels[role]}
            </p>
          </div>
        )}
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={handleLogout}
          disabled={isPending}
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
