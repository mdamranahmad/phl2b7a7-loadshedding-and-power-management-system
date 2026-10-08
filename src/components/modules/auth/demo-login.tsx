"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { userGetMe } from "@/api";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useUserLogin } from "@/hooks";
import { getDashboardPath } from "@/lib/dashboard-path";
import { DEMO_ACCOUNTS } from "@/lib/demo-accounts";
import { getApiErrorMessage } from "@/lib/error";
import type { IUserLoginPayload, IUserRole } from "@/types";

/** One-click demo login: authenticates and redirects by the fresh session role. */
const DemoLoginButtons = () => {
  const { mutate: login, isPending } = useUserLogin();
  const queryClient = useQueryClient();
  const [activeRole, setActiveRole] = useState<IUserRole | null>(null);

  const handleDemoLogin = (accountEmail: string, accountPassword: string) => {
    const credentials: IUserLoginPayload = {
      email: accountEmail,
      password: accountPassword,
    };

    login(credentials, {
      onSuccess: async () => {
        queryClient.removeQueries({ queryKey: ["user"] });
        try {
          const me = await queryClient.fetchQuery({
            queryKey: ["user"],
            queryFn: userGetMe,
            staleTime: 0,
          });
          const role = me.data.role;
          toast.add({
            title: "Demo Login Successful",
            description: `Welcome, ${me.data.name}`,
            type: "success",
          });
          if (role) {
            setActiveRole(null);
            window.location.href = getDashboardPath(role);
          }
        } catch {
          window.location.href = "/";
        }
      },
      onError: (error) => {
        setActiveRole(null);
        toast.add({
          title: "Demo Login Failed",
          description: getApiErrorMessage(error),
          type: "error",
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-sm font-medium text-muted-foreground">
        🚀 Quick Demo Login
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {DEMO_ACCOUNTS.map((account) => {
          const Icon = account.icon;
          const isLoading = isPending && activeRole === account.role;
          return (
            <button
              key={account.role}
              type="button"
              disabled={isPending}
              onClick={() => {
                setActiveRole(account.role);
                handleDemoLogin(account.email, account.password);
              }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="rounded-xl bg-primary/10 p-2 text-primary">
                {isLoading ? (
                  <Spinner className="size-4" />
                ) : (
                  <Icon className="size-4" aria-hidden />
                )}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">
                  {account.label}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {account.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DemoLoginButtons;
