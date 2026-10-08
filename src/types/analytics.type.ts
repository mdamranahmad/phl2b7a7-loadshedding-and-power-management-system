/** `GET /analytics/customer-analytics` → `data` */
export interface ICustomerAnalytics {
  totalTokens: number;
  totalUnusedTokens: number;
  totalRechargeAmount: number;
  totalOutageReports: number;
  totalResolvedOutageReports: number;
}

/** `GET /analytics/technician-analytics` → `data` */
export interface ITechnicianAnalytics {
  totalAssignment: number;
  totalResolvedAssignment: number;
}

/** `GET /analytics/substation-manager-analytics` → `data` */
export interface ISubStationManagerAnalytics {
  totalFeeders: number;
  totalAreas: number;
  totalHouses: number;
  totalAvailableTechnicians: number;
  totalCustomers: number;
  totalOutageScheduleBatchs: number;
  totalOngoinOutageScheduleBatchs: number;
  totalOutageReports: number;
  totalOngoinIssues: number;
  totalAssignedIssue: number;
  totalResolvedIssue: number;
}

/** `GET /analytics/zonal-manager-analytics` → `data` */
export interface IZonalManagerAnalytics {
  totalSubStations: number;
  totalFeeders: number;
  totalAreas: number;
  totalHouses: number;
  totalSubStationManagers: number;
  totalPendingTechnicinApplication: number;
  totalRejectedTechnicinApplication: number;
  totalApprovedTechnicians: number;
  totalAvailableTechnicians: number;
  totalCustomers: number;
  totalOutageScheduleBatchs: number;
  totalOngoinOutageScheduleBatchs: number;
  totalOutageReports: number;
  totalOngoinIssues: number;
  totalAssignedIssue: number;
  totalResolvedIssue: number;
  totalTokens: number;
  totalUnpaidTokens: number;
  totalUnusedTokens: number;
  totalRevenue: number;
}
