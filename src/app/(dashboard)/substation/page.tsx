import type { Metadata } from "next";
import SubstationOverview from "@/components/modules/substation/substation-overview";

export const metadata: Metadata = {
  title: "Substation Manager Dashboard",
  description:
    "Overview of your substation's feeders, schedules and outage issues.",
};

export default function SubstationDashboardPage() {
  return <SubstationOverview />;
}
