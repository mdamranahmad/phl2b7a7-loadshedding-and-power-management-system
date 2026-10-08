import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveOutageReport,
  getZonalOutageReportById,
  getZonalOutageReports,
} from "@/api";
import type { IOutageParams } from "@/types";

export function useZonalOutageReports(params: IOutageParams = {}) {
  return useQuery({
    queryKey: ["zonal-outage-reports", params],
    queryFn: () => getZonalOutageReports(params),
  });
}

export function useZonalOutageReportById(outageReportId: string) {
  return useQuery({
    queryKey: ["zonal-outage-report", outageReportId],
    queryFn: () => getZonalOutageReportById(outageReportId),
    enabled: !!outageReportId,
  });
}

/** Approves a PENDING outage report. */
export function useApproveOutageReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (outageReportId: string) => approveOutageReport(outageReportId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["zonal-outage-reports"],
      });
      queryClient.invalidateQueries({
        queryKey: ["zonal-outage-report"],
      });
      queryClient.invalidateQueries({ queryKey: ["analytics", "zonal"] });
    },
  });
}
