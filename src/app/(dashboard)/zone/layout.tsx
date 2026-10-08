import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

/** Zonal-manager-only routes wrapped in the sidebar shell. */
export default function ZoneLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["ZONE_MANAGER"]}>
      <DashboardShell userRole="ZONE_MANAGER">{children}</DashboardShell>
    </RoleGuard>
  );
}
