import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLoadSheddingSchedule,
  getMyTokens,
  payUnpaidToken,
  rechargeToken,
  reportOutage,
  requestToken,
} from "@/api";
import type {
  IRechargeTokenPayload,
  IReportOutagePayload,
  IRequestTokenPayload,
  IScheduleParams,
  ITokenParams,
} from "@/types";

export function useMyTokens(params: ITokenParams = {}) {
  return useQuery({
    queryKey: ["tokens", params],
    queryFn: () => getMyTokens(params),
  });
}

/** bKash initiation — caller must redirect the browser to `paymentUrl`. */
export function useRequestToken() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IRequestTokenPayload) => requestToken(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
  });
}

export function usePayUnpaidToken() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tokenId: string) => payUnpaidToken(tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
  });
}

export function useRechargeToken() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IRechargeTokenPayload) => rechargeToken(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
      queryClient.invalidateQueries({ queryKey: ["analytics", "customer"] });
    },
  });
}

export function useLoadSheddingSchedule(params: IScheduleParams = {}) {
  return useQuery({
    queryKey: ["loadshedding-schedule", params],
    queryFn: () => getLoadSheddingSchedule(params),
  });
}

export function useReportOutage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IReportOutagePayload) => reportOutage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["analytics", "customer"],
      });
    },
  });
}
