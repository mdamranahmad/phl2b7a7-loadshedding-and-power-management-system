import type { Metadata } from "next";
import TechnicianOverview from "@/components/modules/technician/technician-overview";

export const metadata: Metadata = {
  title: "Technician Dashboard",
  description: "Overview of your outage assignments and resolutions.",
};

export default function TechnicianDashboardPage() {
  return <TechnicianOverview />;
}
