import type { ReactNode } from "react";
import { SessionShell } from "@/components/dashboard/session-shell";

/** bKash return pages — shown inside the signed-in shell. */
export default function PaymentLayout({ children }: { children: ReactNode }) {
  return <SessionShell>{children}</SessionShell>;
}
