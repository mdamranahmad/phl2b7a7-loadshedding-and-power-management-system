import type { TSidebarItems } from "@/types";

const prefix = "/customer";

export const customerRoutes: TSidebarItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: prefix },
      { title: "Load-Shedding Schedule", url: `${prefix}/schedule` },
    ],
  },
  {
    title: "Tokens & Payments",
    items: [{ title: "My Tokens", url: "/dashboard/my-tokens" }],
  },
  {
    title: "Outage",
    items: [{ title: "Report Outage", url: `${prefix}/report-outage` }],
  },
  {
    title: "Account",
    items: [{ title: "Profile & Settings", url: "/dashboard/profile" }],
  },
];
