import type { TSidebarItems } from "@/types";

const prefix = "/substation";

export const subStationManagerRoutes: TSidebarItems = [
  {
    title: "Overview",
    items: [{ title: "Dashboard", url: prefix }],
  },
  {
    title: "Schedules",
    items: [
      { title: "Schedule Batches", url: `${prefix}/schedules` },
      { title: "Generate Schedule", url: `${prefix}/schedules/generate` },
    ],
  },
  {
    title: "Outage Management",
    items: [{ title: "Outage Reports", url: `${prefix}/outage-reports` }],
  },
  {
    title: "Technicians",
    items: [
      { title: "All Technicians", url: `${prefix}/technicians` },
      {
        title: "Applications",
        url: `${prefix}/technician-applications`,
      },
    ],
  },
  {
    title: "Power",
    items: [{ title: "Allocate kW", url: `${prefix}/allocate` }],
  },
  {
    title: "Account",
    items: [{ title: "Profile & Settings", url: "/dashboard/profile" }],
  },
];
