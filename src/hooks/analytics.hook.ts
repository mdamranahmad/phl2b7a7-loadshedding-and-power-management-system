import { useQuery } from "@tanstack/react-query";
import {
  getCustomerAnalytics,
  getSubStationManagerAnalytics,
  getTechnicianAnalytics,
  getZonalManagerAnalytics,
} from "@/api";

export function useCustomerAnalytics() {
  return useQuery({
    queryKey: ["analytics", "customer"],
    queryFn: getCustomerAnalytics,
  });
}

export function useTechnicianAnalytics() {
  return useQuery({
    queryKey: ["analytics", "technician"],
    queryFn: getTechnicianAnalytics,
  });
}

export function useSubStationAnalytics() {
  return useQuery({
    queryKey: ["analytics", "substation"],
    queryFn: getSubStationManagerAnalytics,
  });
}

export function useZonalAnalytics() {
  return useQuery({
    queryKey: ["analytics", "zonal"],
    queryFn: getZonalManagerAnalytics,
  });
}
