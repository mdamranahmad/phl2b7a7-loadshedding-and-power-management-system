import type { TTechnicianVerificationStatus } from "./common.type";
import type { ITechnicianProfile, IUser, IUserRole } from "./user.type";

/** Inner JSON of the `data` field in the multipart technician application. */
export interface IApplyAsTechnicianPayload {
  name: string;
  email: string;
  password: string;
  role: IUserRole;
  address: string;
  expertise: string;
  experienceYear: number;
}

/** `GET /technician/get-pending-tech-application` & `/technician/:id` → data item. */
export interface ITechnicianApplication extends ITechnicianProfile {
  user?: IUser;
}

export interface IApproveTechnicianPayload {
  technicianId: string;
  verificationStatus: TTechnicianVerificationStatus;
  rejectReason?: string | null;
}

export interface ITechnicianParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  expertise?: string;
  isAvailable?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IAssignmentParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  reportStatus?: string;
  isAssigned?: boolean;
  isOngoing?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
