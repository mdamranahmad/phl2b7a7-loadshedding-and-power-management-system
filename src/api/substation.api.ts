import { unwrapNestedList } from "@/api/auth.api";
import apiClient from "@/lib/apiClient";
import { compactParams } from "@/lib/params";
import type {
  IAllocateKwPayload,
  IApiResponse,
  IAssignTechnicianPayload,
  IGenerateSchedulePayload,
  IOutageParams,
  IOutageReport,
  IScheduleBatch,
  IScheduleParams,
  ISubStation,
  ITechnicianParams,
  ITechnicianProfile,
} from "@/types";

export function allocateKw(payload: IAllocateKwPayload) {
  return apiClient<IApiResponse<ISubStation>>(
    "/subStationManager/allocate-kw",
    { method: "POST", body: payload },
  );
}

export function generateSchedule(payload: IGenerateSchedulePayload) {
  return apiClient<IApiResponse<IScheduleBatch>>(
    "/subStationManager/generate-schedule",
    { method: "POST", body: payload },
  );
}

/** Manager list endpoint — wraps `{ data, meta }` inside `data`. */
export function getScheduleBatches(params: IScheduleParams = {}) {
  return apiClient<
    IApiResponse<{ data: IScheduleBatch[]; meta: IApiResponse<never>["meta"] }>
  >("/subStationManager/get-schedule-batches", {
    params: compactParams(params),
  }).then(unwrapNestedList);
}

export function getScheduleBatchById(scheduleBatchId: string) {
  return apiClient<IApiResponse<IScheduleBatch>>(
    `/subStationManager/get-schedule-batches/${scheduleBatchId}`,
  );
}

/** Only DRAFT batches can be published. */
export function publishScheduleBatch(scheduleBatchId: string) {
  return apiClient<IApiResponse<IScheduleBatch>>(
    `/subStationManager/get-schedule-batches/${scheduleBatchId}`,
    { method: "PATCH" },
  );
}

export function deleteScheduleBatch(scheduleBatchId: string) {
  return apiClient<IApiResponse<IScheduleBatch>>(
    `/subStationManager/get-schedule-batches/${scheduleBatchId}`,
    { method: "DELETE" },
  );
}

/** ZONE_MANAGER variant — wraps `{ data, meta }` inside `data`. */
export function getZoneScheduleBatches(params: IScheduleParams = {}) {
  return apiClient<
    IApiResponse<{ data: IScheduleBatch[]; meta: IApiResponse<never>["meta"] }>
  >("/subStationManager/zone/get-schedule-batches", {
    params: compactParams(params),
  }).then(unwrapNestedList);
}

/** Wraps `{ data, meta }` inside `data`; never returns PENDING reports. */
export function getOutageReports(params: IOutageParams = {}) {
  return apiClient<
    IApiResponse<{ data: IOutageReport[]; meta: IApiResponse<never>["meta"] }>
  >("/subStationManager/get-outage-reports", {
    params: compactParams(params),
  }).then(unwrapNestedList);
}

export function getOutageReportById(outageReportId: string) {
  return apiClient<IApiResponse<IOutageReport>>(
    `/subStationManager/get-outage-reports/${outageReportId}`,
  );
}

/** Assigns an APPROVED/REOPENED report to an approved technician. */
export function assignTechnician(
  outageReportId: string,
  payload: IAssignTechnicianPayload,
) {
  return apiClient<IApiResponse<IOutageReport>>(
    `/subStationManager/get-outage-reports/${outageReportId}`,
    { method: "PATCH", body: payload },
  );
}

export function getAllTechnicians(params: ITechnicianParams = {}) {
  return apiClient<IApiResponse<ITechnicianProfile[]>>(
    "/subStationManager/get-all-technicians",
    { params: compactParams(params) },
  );
}
