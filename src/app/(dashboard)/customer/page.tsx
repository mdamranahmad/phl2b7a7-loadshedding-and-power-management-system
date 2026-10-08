import type { Metadata } from "next";
import CustomerOverview from "@/components/modules/customer/customer-overview";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Overview of your tokens, recharges and outage reports.",
};

export default function CustomerDashboardPage() {
  return <CustomerOverview />;
}
