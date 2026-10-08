import type { Metadata } from "next";
import { Suspense } from "react";
import SubstationSchedules from "@/components/modules/substation/substation-schedules";

export const metadata: Metadata = {
  title: "Schedule Batches",
  description: "Manage load-shedding schedule batches for your substation.",
};

export default function SubstationSchedulesPage() {
  return (
    <Suspense>
      <SubstationSchedules />
    </Suspense>
  );
}
