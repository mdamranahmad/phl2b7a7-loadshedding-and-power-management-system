import type {
  TTechnicianAvailabilityStatus,
  TTechnicianVerificationStatus,
  TUserStatus,
} from "./common.type";

export type IUserRole =
  | "CUSTOMER"
  | "TECHNICIAN"
  | "SUBSTATION_MANAGER"
  | "ZONE_MANAGER";

export interface ICustomerProfile {
  id: string;
  name: string;
  email: string;
  address: string | null;
  contactNumber: string | null;
  meterNumber: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ITechnicianProfile {
  id: string;
  name: string;
  email: string;
  address: string;
  contactNumber: string | null;
  expertise: string;
  experienceYear: number;
  verificationStatus: TTechnicianVerificationStatus;
  rejectionReason: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  resumeUrl: string | null;
  resumePublicId: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  isAvailable: TTechnicianAvailabilityStatus;
  userId: string;
}

export interface ISubStationManagerProfile {
  id: string;
  name: string;
  email: string;
  address: string;
  contactNumber: string | null;
  employeeId: string;
  zoneId: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface IZoneManagerProfile {
  id: string;
  name: string;
  email: string;
  address: string | null;
  contactNumber: string | null;
  employeeId: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

/** Shape of `GET /auth/get-me` → `data` (the user object itself, unwrapped). */
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: IUserRole | null;
  status: TUserStatus | null;
  nid: string | null;
  dob: string | null;
  isDeleted: boolean | null;
  deletedAt: string | null;
  emailVerified: boolean | null;
  needPasswordChange: boolean;
  createdAt: string;
  updatedAt: string;
  customerProfile: ICustomerProfile | null;
  technicianProfile: ITechnicianProfile | null;
  subStationManager: ISubStationManagerProfile | null;
  zoneManager: IZoneManagerProfile | null;
}
