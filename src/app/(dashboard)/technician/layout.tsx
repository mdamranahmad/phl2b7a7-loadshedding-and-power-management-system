import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

/** Technician-only routes wrapped in the sidebar shell. */
export default function TechnicianLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard roles={["TECHNICIAN"]}>
      <DashboardShell userRole="TECHNICIAN">{children}</DashboardShell>
    </RoleGuard>
  );
}
