export interface IUserLoginPayload {
    email: string;
    password: string;
}

export interface IUserLoginResponse {
    accessToken: string;
    refreshToken: string;
}
