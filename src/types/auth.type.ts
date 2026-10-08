import type { ICustomerProfile, IUser } from "./user.type";

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

export interface IEmailVerifyPayload {
  email: string;
  otp: string;
}

/** `POST /auth/email-verify` → `data` */
export interface IEmailVerifyResponse {
  user: IUser;
  customer: ICustomerProfile;
  accessToken: string;
  refreshToken: string;
}
