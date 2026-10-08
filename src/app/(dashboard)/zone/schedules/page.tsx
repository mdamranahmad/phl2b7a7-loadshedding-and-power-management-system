import type { Metadata } from "next";
import { Suspense } from "react";
import ZoneSchedules from "@/components/modules/zone/zone-schedules";

export const metadata: Metadata = {
  title: "Schedule Batches",
  description: "Load-shedding schedule batches across your zone.",
};

export default function ZoneSchedulesPage() {
  return (
    <Suspense>
      <ZoneSchedules />
    </Suspense>
  );
}
