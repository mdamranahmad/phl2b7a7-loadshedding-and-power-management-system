"use client";

import RouteError from "@/components/modules/common/route-error";

export default function DashboardErrorBoundary(props: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <RouteError {...props} />;
}
