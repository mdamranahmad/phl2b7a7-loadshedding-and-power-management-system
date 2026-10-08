import apiClient from "@/lib/apiClient";
import { compactParams } from "@/lib/params";
import type {
  IApiResponse,
  IApplyAsTechnicianPayload,
  IApproveTechnicianPayload,
  IAssignmentParams,
  IEmailVerifyPayload,
  IOutageReport,
  ITechnicianApplication,
  ITechnicianParams,
  ITechnicianProfile,
  IUser,
} from "@/types";

/**
 * Public multipart application: `resume` (file) + `data` (JSON string).
 * Endpoint: POST /technician/apply-as-technician
 */
export function applyAsTechnician(
  payload: IApplyAsTechnicianPayload,
  resume: File,
) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));
  formData.append("resume", resume);

  return apiClient<IApiResponse<IUser>>("/technician/apply-as-technician", {
    method: "POST",
    body: formData,
  });
}

export function verifyTechnicianEmail(payload: IEmailVerifyPayload) {
  return apiClient<IApiResponse<IUser>>("/technician/email-verify", {
    method: "POST",
    body: payload,
  });
}

export function getAssignments(params: IAssignmentParams = {}) {
  return apiClient<IApiResponse<IOutageReport[]>>(
    "/technician/get-assignments",
    { params: compactParams(params) },
  );
}

/** Marks the technician's own ASSIGNED report as RESOLVED. */
export function resolveAssignment(outageReportId: string) {
  return apiClient<IApiResponse<IOutageReport>>(
    `/technician/get-assignments/${outageReportId}`,
    { method: "PATCH" },
  );
}

/** ZONE_MANAGER / SUBSTATION_MANAGER review of a technician application. */
export function approveTechnician(payload: IApproveTechnicianPayload) {
  return apiClient<IApiResponse<ITechnicianProfile>>(
    "/technician/approve-technician",
    { method: "PATCH", body: payload },
  );
}

export function getPendingTechApplications(params: ITechnicianParams = {}) {
  return apiClient<IApiResponse<ITechnicianApplication[]>>(
    "/technician/get-pending-tech-application",
    { params: compactParams(params) },
  );
}

export function getTechnicianById(technicianId: string) {
  return apiClient<IApiResponse<ITechnicianApplication>>(
    `/technician/${technicianId}`,
  );
}
