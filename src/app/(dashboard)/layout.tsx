import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/auth-guard";

/** Every route in this group requires a logged-in session. */
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default DashboardLayout;
