import apiClient from "@/lib/apiClient";
import type {
  IApiResponse,
  IEmailVerifyPayload,
  IEmailVerifyResponse,
  IMeta,
  IUser,
  IUserLoginPayload,
  IUserLoginResponse,
  IUserRegisterPayload,
} from "@/types";

export function userLogin(payload: IUserLoginPayload) {
  return apiClient<IApiResponse<IUserLoginResponse>>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function userLogout() {
  return apiClient<IApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
}

export function userGetMe() {
  return apiClient<IApiResponse<IUser>>("/auth/get-me");
}

/** Registers a CUSTOMER account. Responds with `data: null` + emails an OTP. */
export function userRegister(payload: IUserRegisterPayload) {
  return apiClient<IApiResponse<null>>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

/** Verifies the 6-digit registration OTP and sets auth cookies. */
export function userVerifyEmail(payload: IEmailVerifyPayload) {
  return apiClient<IApiResponse<IEmailVerifyResponse>>("/auth/email-verify", {
    method: "POST",
    body: payload,
  });
}

/** Some manager list endpoints nest `{ data, meta }` inside `data`. */
export function unwrapNestedList<T>(
  response: IApiResponse<{ data: T[]; meta?: IMeta }>,
): IApiResponse<T[]> {
  return {
    ...response,
    data: response.data.data,
    meta: response.data.meta,
  };
}
