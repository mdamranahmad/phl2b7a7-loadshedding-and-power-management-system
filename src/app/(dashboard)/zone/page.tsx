import type { Metadata } from "next";
import ZoneOverview from "@/components/modules/zone/zone-overview";

export const metadata: Metadata = {
  title: "Zonal Manager Dashboard",
  description:
    "Overview of substations, technicians, issues and revenue in your zone.",
};

export default function ZoneDashboardPage() {
  return <ZoneOverview />;
}
