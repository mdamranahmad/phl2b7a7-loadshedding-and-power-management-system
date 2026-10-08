import type { IUserRole } from "@/types";

/** Role-specific landing route inside the protected dashboard. */
export function getDashboardPath(role: IUserRole): string {
  switch (role) {
    case "CUSTOMER":
      return "/customer";
    case "TECHNICIAN":
      return "/technician";
    case "ZONE_MANAGER":
      return "/zone";
    case "SUBSTATION_MANAGER":
      return "/substation";
  }
}
