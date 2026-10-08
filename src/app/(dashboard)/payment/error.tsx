"use client";

import RouteError from "@/components/modules/common/route-error";

export default function PaymentErrorBoundary(props: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <RouteError {...props} />;
}
