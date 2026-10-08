import type { ReactNode } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { IUserRole } from "@/types";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardShell({
  children,
  userRole,
}: {
  children: ReactNode;
  userRole: IUserRole;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm text-muted-foreground">
            Load Shedding & Power Management System
          </span>
        </header>
        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
