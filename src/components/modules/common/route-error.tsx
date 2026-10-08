"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

/**
 * Shared client error boundary UI.
 *
 * Used by the root `app/error.tsx` and the per-segment dashboard boundaries so
 * a crash in one page never blanks the whole app. Fires a toast on mount and
 * offers a retry plus a way back home.
 */
export default function RouteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    toast.add({
      title: "Something went wrong",
      description:
        error.message ||
        "An unexpected error occurred while loading this page.",
      type: "error",
    });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-4">
        <TriangleAlert className="size-8 text-destructive" aria-hidden />
      </div>
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight">
          Oops! Something went wrong.
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {error.message ||
            "We could not load this page. Please try again or head back home."}
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={retry}>
          <RefreshCw className="size-4" />
          Try Again
        </Button>
        <Button variant="outline" render={<Link href="/">Go Home</Link>} />
      </div>
    </div>
  );
}
