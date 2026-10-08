import apiClient from "@/lib/apiClient";
import { compactParams } from "@/lib/params";
import type {
  IApiResponse,
  IOutageReport,
  IPaymentUrlResponse,
  IRechargeTokenPayload,
  IReportOutagePayload,
  IRequestTokenPayload,
  ISchedule,
  IScheduleParams,
  IToken,
  ITokenParams,
} from "@/types";

/** bKash hosted-checkout initiation → browser must go to `paymentUrl`. */
export function requestToken(payload: IRequestTokenPayload) {
  return apiClient<IApiResponse<IPaymentUrlResponse>>("/user/request-token", {
    method: "POST",
    body: payload,
  });
}

export function getMyTokens(params: ITokenParams = {}) {
  return apiClient<IApiResponse<IToken[]>>("/user/get-my-tokens", {
    params: compactParams(params),
  });
}

/** Pays an existing UNPAID token → responds with a new `paymentUrl`. */
export function payUnpaidToken(tokenId: string) {
  return apiClient<IApiResponse<IPaymentUrlResponse>>(
    `/user/get-my-tokens/${tokenId}`,
    { method: "PATCH" },
  );
}

/** Backend field name is capital-T `TokenNo`. */
export function rechargeToken(payload: IRechargeTokenPayload) {
  return apiClient<IApiResponse<IToken>>("/user/recharge-token", {
    method: "POST",
    body: payload,
  });
}

export function getLoadSheddingSchedule(params: IScheduleParams = {}) {
  return apiClient<IApiResponse<ISchedule[]>>(
    "/user/get-loadshedding-schedule",
    { params: compactParams(params) },
  );
}

/** Backend field name is capital-O `OutageSeverity`. */
export function reportOutage(payload: IReportOutagePayload) {
  return apiClient<IApiResponse<IOutageReport>>("/user/report-outage", {
    method: "POST",
    body: payload,
  });
}
