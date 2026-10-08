import type { TMeterType, TPaymentStatus, TTokenStatus } from "./common.type";

export interface ITokenPayment {
  amount: string;
  status: TPaymentStatus;
}

export interface IToken {
  id: string;
  tokenNo: string;
  tokenSeqNo: number;
  meterNo: string;
  meterType: TMeterType;
  rechargeAmount: string;
  tokenStatus: TTokenStatus;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  payment: ITokenPayment | null;
}

/** Both bKash initiation endpoints respond with this. */
export interface IPaymentUrlResponse {
  paymentUrl: string;
}

export interface IRequestTokenPayload {
  rechargeAmount: number;
}

/** Backend field name is capital-T `TokenNo`. */
export interface IRechargeTokenPayload {
  TokenNo: string;
}

export interface ITokenParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: TPaymentStatus;
  meterType?: TMeterType;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/** `?status=` values sent back by the bKash payment callback redirect. */
export type TPaymentReturnStatus = "success" | "failure" | "cancel";
