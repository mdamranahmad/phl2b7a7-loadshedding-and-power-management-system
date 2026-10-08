export type TUserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export type TOutageSeverity =
  | "TOTAL_BLACKOUT"
  | "PARTIAL_POWER"
  | "DIM_LIGHTS"
  | "NEIGHBORHOOD_WIDE"
  | "OTHERS";

export type TOutageReportStatus =
  | "PENDING"
  | "APPROVED"
  | "ASSIGNED"
  | "RESOLVED"
  | "REOPENED";

export type TScheduleStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "CANCELLED"
  | "UPCOMING"
  | "ONGOING"
  | "COMPLETED";

export type TPaymentStatus =
  | "UNPAID"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type TTokenStatus = "USED" | "UNUSED";

export type TMeterType =
  | "ONLINE_PREPAID"
  | "ONLINE_POSTPAID"
  | "OFFLINE_PREPAID"
  | "OFFLINE_POSTPAID";

export type TTechnicianAvailabilityStatus =
  | "OFF_DUTY"
  | "AVAILABLE"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "ON_HOLD";

export type TTechnicianVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";
