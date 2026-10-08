import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  applyAsTechnician,
  approveTechnician,
  getAssignments,
  getPendingTechApplications,
  getTechnicianById,
  resolveAssignment,
  verifyTechnicianEmail,
} from "@/api";
import type {
  IApplyAsTechnicianPayload,
  IApproveTechnicianPayload,
  IAssignmentParams,
  IEmailVerifyPayload,
  ITechnicianParams,
} from "@/types";

/** Public multipart application (resume file + JSON `data`). */
export function useApplyAsTechnician() {
  return useMutation({
    mutationFn: ({
      payload,
      resume,
    }: {
      payload: IApplyAsTechnicianPayload;
      resume: File;
    }) => applyAsTechnician(payload, resume),
  });
}

export function useVerifyTechnicianEmail() {
  return useMutation({
    mutationFn: (payload: IEmailVerifyPayload) =>
      verifyTechnicianEmail(payload),
  });
}

export function useGetAssignments(params: IAssignmentParams = {}) {
  return useQuery({
    queryKey: ["assignments", params],
    queryFn: () => getAssignments(params),
  });
}

export function useResolveAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (outageReportId: string) => resolveAssignment(outageReportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["analytics", "technician"] });
    },
  });
}

export function useGetPendingTechApplications(params: ITechnicianParams = {}) {
  return useQuery({
    queryKey: ["technician-applications", params],
    queryFn: () => getPendingTechApplications(params),
  });
}

export function useApproveTechnician() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IApproveTechnicianPayload) =>
      approveTechnician(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["technician-applications"],
      });
      queryClient.invalidateQueries({ queryKey: ["technician"] });
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
    },
  });
}

export function useGetTechnicianById(technicianId: string) {
  return useQuery({
    queryKey: ["technician", technicianId],
    queryFn: () => getTechnicianById(technicianId),
    enabled: !!technicianId,
  });
}
