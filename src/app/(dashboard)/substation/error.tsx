"use client";

import RouteError from "@/components/modules/common/route-error";

export default function SubstationErrorBoundary(props: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <RouteError {...props} />;
}
