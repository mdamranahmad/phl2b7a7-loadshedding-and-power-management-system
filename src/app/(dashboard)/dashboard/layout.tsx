import type { ReactNode } from "react";
import { SessionShell } from "@/components/dashboard/session-shell";

/** Shared account routes (tokens, profile, payment results) for every role. */
export default function SharedDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionShell>{children}</SessionShell>;
}
