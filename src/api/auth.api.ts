import apiClient from "@/lib/apiClient";
import { IApiResponse, IUserLoginPayload, IUserLoginResponse } from "@/types";

export function userLogin(payload: IUserLoginPayload) {
    return apiClient<IApiResponse<IUserLoginResponse>>("/auth/login", {
        method: "POST",
        body: payload,
    });
}
