export interface IUserLoginPayload {
    email: string;
    password: string;
}

export interface IUserLoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IUserRegisterPayload {
    name: string;
    email: string;
    password: string;
    customerProfile: {
        meterNumber: string;
    };
}
