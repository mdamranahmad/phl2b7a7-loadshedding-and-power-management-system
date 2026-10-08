import type { TOutageReportStatus, TOutageSeverity } from "./common.type";
import type { ICustomerProfile, ITechnicianProfile } from "./user.type";

export interface IOutageReport {
  id: string;
  ticketNo: string;
  title: string;
  description: string;
  severity: TOutageSeverity;
  outageStartTime: string;
  isOngoing: boolean;
  address: string;
  reporterId: string;
  reportStatus: TOutageReportStatus;
  zoneId: string;
  subStationId: string;
  areaId: string;
  technicianId: string | null;
  isAssigned: boolean;
  createdAt: string;
  updatedAt: string;
  /** Included on assignment lists & report details (shape varies per endpoint). */
  area?: { id: string; name: string };
  reporter?: Partial<ICustomerProfile> & { id: string; name: string };
  technician?: Partial<ITechnicianProfile> & { id: string; name: string };
  subStation?: { id: string; name: string };
}

/** Backend field name is capital-O `OutageSeverity`. */
export interface IReportOutagePayload {
  OutageSeverity: TOutageSeverity;
  issueTitle: string;
  description: string;
  outageStartTime: string;
  address: string;
  isOngoing?: boolean;
}

export interface IAssignTechnicianPayload {
  technicianId: string;
}

export interface IOutageParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  reportStatus?: TOutageReportStatus;
  isAssigned?: boolean;
  isOngoing?: boolean;
  ticketNo?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
