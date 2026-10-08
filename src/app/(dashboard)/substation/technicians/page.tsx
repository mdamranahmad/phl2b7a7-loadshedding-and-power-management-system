import type { Metadata } from "next";
import { Suspense } from "react";
import TechnicianList from "@/components/modules/substation/technician-list";

export const metadata: Metadata = {
  title: "All Technicians",
  description: "Technicians registered under your substation.",
};

export default function TechniciansPage() {
  return (
    <Suspense>
      <TechnicianList />
    </Suspense>
  );
}
