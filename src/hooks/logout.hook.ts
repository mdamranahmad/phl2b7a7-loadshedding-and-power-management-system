"use client";

import { useCallback } from "react";
import { toast } from "@/components/ui/toast";
import { useUserLogout } from "@/hooks";
import type { IApiError } from "@/types";

/** Logs out, clears the cached session (full reload) and navigates away. */
export function useLogoutHandler(redirectTo = "/") {
  const { mutate: logout, isPending } = useUserLogout();

  const handleLogout = useCallback(() => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "GoodBye",
          description: "Logged out successfully",
          type: "success",
        });
        // Full reload guarantees every cached session/query is dropped.
        window.location.href = redirectTo;
      },
      onError: (err: IApiError) => {
        toast.add({
          title: "Logout Failed!",
          description: err.data?.message || "Something went wrong",
          type: "error",
        });
      },
    });
  }, [logout, redirectTo]);

  return { handleLogout, isPending };
}
