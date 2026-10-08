import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  allocateKw,
  assignTechnician,
  deleteScheduleBatch,
  generateSchedule,
  getAllTechnicians,
  getOutageReportById,
  getOutageReports,
  getScheduleBatchById,
  getScheduleBatches,
  getZoneScheduleBatches,
  publishScheduleBatch,
} from "@/api";
import type {
  IAllocateKwPayload,
  IAssignTechnicianPayload,
  IGenerateSchedulePayload,
  IOutageParams,
  IScheduleParams,
  ITechnicianParams,
} from "@/types";

export function useAllocateKw() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IAllocateKwPayload) => allocateKw(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-batches"] });
    },
  });
}

export function useGenerateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IGenerateSchedulePayload) =>
      generateSchedule(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-batches"] });
    },
  });
}

export function useScheduleBatches(params: IScheduleParams = {}) {
  return useQuery({
    queryKey: ["schedule-batches", params],
    queryFn: () => getScheduleBatches(params),
  });
}

export function useZoneScheduleBatches(params: IScheduleParams = {}) {
  return useQuery({
    queryKey: ["zone-schedule-batches", params],
    queryFn: () => getZoneScheduleBatches(params),
  });
}

export function useScheduleBatchById(scheduleBatchId: string) {
  return useQuery({
    queryKey: ["schedule-batch", scheduleBatchId],
    queryFn: () => getScheduleBatchById(scheduleBatchId),
    enabled: !!scheduleBatchId,
  });
}

export function usePublishScheduleBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scheduleBatchId: string) =>
      publishScheduleBatch(scheduleBatchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-batches"] });
      queryClient.invalidateQueries({ queryKey: ["schedule-batch"] });
    },
  });
}

export function useDeleteScheduleBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scheduleBatchId: string) =>
      deleteScheduleBatch(scheduleBatchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-batches"] });
    },
  });
}

export function useOutageReports(params: IOutageParams = {}) {
  return useQuery({
    queryKey: ["outage-reports", params],
    queryFn: () => getOutageReports(params),
  });
}

export function useOutageReportById(outageReportId: string) {
  return useQuery({
    queryKey: ["outage-report", outageReportId],
    queryFn: () => getOutageReportById(outageReportId),
    enabled: !!outageReportId,
  });
}

export function useAssignTechnician() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      outageReportId,
      payload,
    }: {
      outageReportId: string;
      payload: IAssignTechnicianPayload;
    }) => assignTechnician(outageReportId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outage-reports"] });
      queryClient.invalidateQueries({ queryKey: ["outage-report"] });
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({
        queryKey: ["analytics", "substation"],
      });
    },
  });
}

export function useAllTechnicians(params: ITechnicianParams = {}) {
  return useQuery({
    queryKey: ["technicians", params],
    queryFn: () => getAllTechnicians(params),
  });
}
