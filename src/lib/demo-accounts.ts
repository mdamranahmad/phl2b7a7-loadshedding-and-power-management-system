import type { LucideIcon } from "lucide-react";
import { Building2, HardHat, UserRound, Zap } from "lucide-react";
import type { IUserRole } from "@/types";

export interface IDemoAccount {
  role: IUserRole;
  label: string;
  description: string;
  email: string;
  password: string;
  icon: LucideIcon;
}

/** One-click demo credentials for every role of the system. */
export const DEMO_ACCOUNTS: IDemoAccount[] = [
  {
    role: "CUSTOMER",
    label: "Customer",
    description: "Schedule, tokens & outage reports",
    email: "imugeb@gmail.com",
    password: "123456Aa",
    icon: UserRound,
  },
  {
    role: "TECHNICIAN",
    label: "Technician",
    description: "Field assignments & resolution",
    email: "testtechnician01@email.com",
    password: "Test@technician12345",
    icon: HardHat,
  },
  {
    role: "ZONE_MANAGER",
    label: "Zonal Manager",
    description: "Approve outages & analytics",
    email: "zonemanager01@email.com",
    password: "Zone@manager12345",
    icon: Zap,
  },
  {
    role: "SUBSTATION_MANAGER",
    label: "Substation Manager",
    description: "Schedules, kW & dispatching",
    email: "substationmanager01@email.com",
    password: "Substation@manager12345",
    icon: Building2,
  },
];
