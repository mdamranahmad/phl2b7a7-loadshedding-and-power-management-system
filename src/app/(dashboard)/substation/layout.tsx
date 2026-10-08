import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

/** Substation-manager-only routes wrapped in the sidebar shell. */
export default function SubstationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard roles={["SUBSTATION_MANAGER"]}>
      <DashboardShell userRole="SUBSTATION_MANAGER">{children}</DashboardShell>
    </RoleGuard>
  );
}
