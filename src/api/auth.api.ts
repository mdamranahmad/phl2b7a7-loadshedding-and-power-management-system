import apiClient from "@/lib/apiClient";
import {
    IApiResponse,
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
    return apiClient("/auth/get-me");
}

export function userRegister(payload: IUserRegisterPayload) {
    return apiClient<IApiResponse<null>>("/auth/register", {
        method: "POST",
        body: payload,
    });
}
