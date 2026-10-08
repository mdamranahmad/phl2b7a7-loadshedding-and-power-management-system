"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useUserGetMe } from "@/hooks";
import AuthLoading from "./auth-loading";

/** Blocks a route group until `GET /auth/get-me` resolves; else redirects to /login. */
const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data, isPending, isError } = useUserGetMe();
  const user = data?.data;

  useEffect(() => {
    if (isPending) return;
    if (isError || !user) router.replace("/login");
  }, [isError, isPending, user, router]);

  if (isPending) return <AuthLoading />;
  if (isError || !user) return <AuthLoading label="Redirecting..." />;

  return <>{children}</>;
};

export default AuthGuard;
