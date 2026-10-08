import type { Metadata } from "next";
import { Suspense } from "react";
import SubstationOutageReports from "@/components/modules/substation/substation-outage-reports";

export const metadata: Metadata = {
  title: "Outage Reports",
  description: "Assign technicians to approved outage reports.",
};

export default function SubstationOutageReportsPage() {
  return (
    <Suspense>
      <SubstationOutageReports />
    </Suspense>
  );
}
