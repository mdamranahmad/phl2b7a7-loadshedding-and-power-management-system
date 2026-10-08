import type { TSidebarItems } from "@/types";

const prefix = "/zone";

export const zonalManagerRoutes: TSidebarItems = [
  {
    title: "Overview",
    items: [{ title: "Dashboard", url: prefix }],
  },
  {
    title: "Management",
    items: [
      { title: "Outage Reports", url: `${prefix}/outage-reports` },
      { title: "Schedule Batches", url: `${prefix}/schedules` },
    ],
  },
  {
    title: "Account",
    items: [{ title: "Profile & Settings", url: "/dashboard/profile" }],
  },
];
