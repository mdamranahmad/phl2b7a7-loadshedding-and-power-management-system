import type { Metadata } from "next";
import { Suspense } from "react";
import ZonalOutageReports from "@/components/modules/zone/zone-outage-reports";

export const metadata: Metadata = {
  title: "Outage Reports",
  description: "Review and approve outage reports in your zone.",
};

export default function ZoneOutageReportsPage() {
  return (
    <Suspense>
      <ZonalOutageReports />
    </Suspense>
  );
}
