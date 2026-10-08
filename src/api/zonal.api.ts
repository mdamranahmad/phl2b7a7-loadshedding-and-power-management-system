import { unwrapNestedList } from "@/api/auth.api";
import apiClient from "@/lib/apiClient";
import { compactParams } from "@/lib/params";
import type { IApiResponse, IOutageParams, IOutageReport } from "@/types";

/** Wraps `{ data, meta }` inside `data`; scoped to the manager's zone. */
export function getZonalOutageReports(params: IOutageParams = {}) {
  return apiClient<
    IApiResponse<{ data: IOutageReport[]; meta: IApiResponse<never>["meta"] }>
  >("/zonalManager/get-outage-reports", {
    params: compactParams(params),
  }).then(unwrapNestedList);
}

export function getZonalOutageReportById(outageReportId: string) {
  return apiClient<IApiResponse<IOutageReport>>(
    `/zonalManager/get-outage-reports/${outageReportId}`,
  );
}

/** Approves a PENDING outage report (no request body). */
export function approveOutageReport(outageReportId: string) {
  return apiClient<IApiResponse<IOutageReport>>(
    `/zonalManager/get-outage-reports/${outageReportId}`,
    { method: "POST" },
  );
}
