import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

/** Customer-only routes wrapped in the sidebar shell. */
export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["CUSTOMER"]}>
      <DashboardShell userRole="CUSTOMER">{children}</DashboardShell>
    </RoleGuard>
  );
}
