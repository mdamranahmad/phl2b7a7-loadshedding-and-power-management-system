import type { Metadata } from "next";
import { Suspense } from "react";
import TechnicianApplications from "@/components/modules/substation/technician-applications";

export const metadata: Metadata = {
  title: "Technician Applications",
  description: "Review and approve pending technician applications.",
};

export default function TechnicianApplicationsPage() {
  return (
    <Suspense>
      <TechnicianApplications />
    </Suspense>
  );
}
