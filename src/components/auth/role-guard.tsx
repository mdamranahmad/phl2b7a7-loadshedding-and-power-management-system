"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useUserGetMe } from "@/hooks";
import type { IUserRole } from "@/types";
import AccessDenied from "./access-denied";
import AuthLoading from "./auth-loading";

interface IRoleGuardProps {
  children: ReactNode;
  roles: IUserRole[];
}

/** Route-level role enforcement: wrong role renders <AccessDenied />. */
const RoleGuard = ({ children, roles }: IRoleGuardProps) => {
  const router = useRouter();
  const { data, isPending, isError } = useUserGetMe();
  const user = data?.data;
  const isAuthorized = !!user?.role && roles.includes(user.role);

  useEffect(() => {
    if (isPending) return;
    if (isError || !user) router.replace("/login");
  }, [isError, isPending, user, router]);

  if (isPending) return <AuthLoading />;
  if (isError || !user) return <AuthLoading label="Redirecting..." />;
  if (isAuthorized) return <>{children}</>;

  return <AccessDenied />;
};

export default RoleGuard;
