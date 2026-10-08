import type { Metadata } from "next";
import { Suspense } from "react";
import CustomerSchedule from "@/components/modules/customer/customer-schedule";

export const metadata: Metadata = {
  title: "Load-Shedding Schedule",
  description: "Browse published load-shedding schedules for your area.",
};

export default function CustomerSchedulePage() {
  return (
    <Suspense>
      <CustomerSchedule />
    </Suspense>
  );
}
