import type { TScheduleStatus } from "./common.type";

export interface IAreaRef {
  id: string;
  name: string;
}

export interface ISubStation {
  id: string;
  name: string;
  capacityKw: number | null;
  allocatedKw: number | null;
  subStationManagerId: string | null;
  zoneId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISchedule {
  id: string;
  status: TScheduleStatus;
  startTime: string;
  endTime: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  areaId: string;
  subStationId: string;
  createdById: string;
  scheduleBatchId: string;
  area?: IAreaRef;
}

export interface IScheduleBatch {
  id: string;
  title: string | null;
  status: TScheduleStatus;
  reason: string | null;
  scheduleDuration: number;
  outageSlotDuration: number;
  batchStartTime: string;
  batchEndTime: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  subStationId: string;
  createdById: string;
  subStation?: IAreaRef;
  createdBy?: { userId?: string; name: string };
  schedules?: ISchedule[];
}

export interface IAllocateKwPayload {
  capacityKw: number;
  allocatedKw: number;
}

/** ISO 8601 datetimes + durations in seconds. */
export interface IGenerateSchedulePayload {
  capacityKw: number;
  allocatedKw: number;
  scheduleDuration: number;
  outageSlotDuration: number;
  batchStartTime: string;
  batchEndTime: string;
}

export interface IScheduleParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: TScheduleStatus;
  batchStartTime?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
