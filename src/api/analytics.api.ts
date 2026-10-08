import apiClient from "@/lib/apiClient";
import type {
  IApiResponse,
  ICustomerAnalytics,
  ISubStationManagerAnalytics,
  ITechnicianAnalytics,
  IZonalManagerAnalytics,
} from "@/types";

export function getCustomerAnalytics() {
  return apiClient<IApiResponse<ICustomerAnalytics>>(
    "/analytics/customer-analytics",
  );
}

export function getTechnicianAnalytics() {
  return apiClient<IApiResponse<ITechnicianAnalytics>>(
    "/analytics/technician-analytics",
  );
}

export function getSubStationManagerAnalytics() {
  return apiClient<IApiResponse<ISubStationManagerAnalytics>>(
    "/analytics/substation-manager-analytics",
  );
}

export function getZonalManagerAnalytics() {
  return apiClient<IApiResponse<IZonalManagerAnalytics>>(
    "/analytics/zonal-manager-analytics",
  );
}
