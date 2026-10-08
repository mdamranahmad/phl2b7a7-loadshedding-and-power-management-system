import type { TSidebarItems } from "@/types";

const prefix = "/technician";

export const technicianRoutes: TSidebarItems = [
  {
    title: "Overview",
    items: [{ title: "Dashboard", url: prefix }],
  },
  {
    title: "Work",
    items: [{ title: "My Assignments", url: `${prefix}/assignments` }],
  },
  {
    title: "Account",
    items: [{ title: "Profile & Settings", url: `${prefix}/profile` }],
  },
];
