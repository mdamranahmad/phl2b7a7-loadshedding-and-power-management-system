"use client";

import type { ReactNode } from "react";
import AccessDenied from "@/components/auth/access-denied";
import AuthLoading from "@/components/auth/auth-loading";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { useUserGetMe } from "@/hooks";

/**
 * Renders the sidebar dashboard chrome for whichever role the current session
 * belongs to. Used by shared routes (`/dashboard/*`, `/payment/*`) that are
 * open to every authenticated role. Role-specific route groups wrap this in a
 * `RoleGuard`.
 */
export function SessionShell({ children }: { children: ReactNode }) {
  const { data, isPending, isError } = useUserGetMe();
  const role = data?.data.role;

  if (isPending) return <AuthLoading />;
  if (isError || !data?.data) return <AuthLoading label="Redirecting..." />;
  if (!role) return <AccessDenied />;

  return <DashboardShell userRole={role}>{children}</DashboardShell>;
}
