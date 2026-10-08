"use client";

import {
  Building2,
  FileWarning,
  MapPinned,
  RefreshCw,
  Users,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import StatsBarChart from "@/components/modules/charts/stats-bar-chart";
import StatusDonutChart from "@/components/modules/charts/status-donut-chart";
import EmptyState from "@/components/modules/common/empty-state";
import PageHeader from "@/components/modules/common/page-header";
import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import StatCard from "@/components/modules/common/stat-card";
import StatusBadge from "@/components/modules/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useZonalAnalytics, useZonalOutageReports } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";

const ZoneOverview = () => {
  const {
    data: analytics,
    isPending,
    isError,
    error,
    refetch,
  } = useZonalAnalytics();
  const { data: recentReports, isPending: isReportsPending } =
    useZonalOutageReports({ limit: 5, sortBy: "createdAt", sortOrder: "desc" });

  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skeletonKeys(4).map((key) => (
            <Skeleton key={key} className="h-32 rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">
          {getApiErrorMessage(error)}
        </p>
        <Button variant="outline" onClick={() => void refetch()}>
          <RefreshCw className="size-4" />
          Try again
        </Button>
      </div>
    );
  }

  const stats = analytics?.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Zonal Manager Dashboard"
        description="Everything happening across your zone — substations, technicians, issues and revenue."
        actions={
          <Button
            variant="outline"
            render={<Link href="/zone/outage-reports" />}
          >
            <FileWarning className="size-4" />
            Outage reports
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Substations"
          value={stats?.totalSubStations ?? 0}
          description={`${stats?.totalFeeders ?? 0} feeders`}
          icon={Building2}
        />
        <StatCard
          label="Customers"
          value={stats?.totalCustomers ?? 0}
          description={`${stats?.totalHouses ?? 0} houses connected`}
          icon={Users}
        />
        <StatCard
          label="Open issues"
          value={stats?.totalOngoinIssues ?? 0}
          description={`${stats?.totalAssignedIssue ?? 0} assigned`}
          icon={Wrench}
        />
        <StatCard
          label="Revenue"
          value={`৳${stats?.totalRevenue ?? 0}`}
          description={`${stats?.totalUnpaidTokens ?? 0} unpaid tokens`}
          icon={Wallet}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Approved technicians"
          value={stats?.totalApprovedTechnicians ?? 0}
          description={`${stats?.totalAvailableTechnicians ?? 0} available`}
          icon={Wrench}
        />
        <StatCard
          label="Pending applications"
          value={stats?.totalPendingTechnicinApplication ?? 0}
          description={`${stats?.totalRejectedTechnicinApplication ?? 0} rejected`}
          icon={FileWarning}
        />
        <StatCard
          label="Schedule batches"
          value={stats?.totalOutageScheduleBatchs ?? 0}
          description={`${stats?.totalOngoinOutageScheduleBatchs ?? 0} ongoing`}
          icon={Zap}
        />
        <StatCard
          label="Areas covered"
          value={stats?.totalAreas ?? 0}
          icon={MapPinned}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Issue resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsBarChart
              data={[
                { label: "Reports", value: stats?.totalOutageReports ?? 0 },
                { label: "Ongoing", value: stats?.totalOngoinIssues ?? 0 },
                { label: "Assigned", value: stats?.totalAssignedIssue ?? 0 },
                { label: "Resolved", value: stats?.totalResolvedIssue ?? 0 },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Technician applications</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusDonutChart
              data={[
                {
                  label: "Approved",
                  value: stats?.totalApprovedTechnicians ?? 0,
                },
                {
                  label: "Pending",
                  value: stats?.totalPendingTechnicinApplication ?? 0,
                },
                {
                  label: "Rejected",
                  value: stats?.totalRejectedTechnicinApplication ?? 0,
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <FileWarning className="size-4 text-primary" />
              Recent outage reports
            </span>
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/zone/outage-reports" />}
            >
              View all
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isReportsPending ? (
            skeletonKeys(3).map((key) => (
              <Skeleton key={key} className="h-14 rounded-xl" />
            ))
          ) : !recentReports?.data.length ? (
            <EmptyState
              title="No reports yet"
              description="Outage reports from customers in your zone will appear here."
              icon={FileWarning}
            />
          ) : (
            recentReports.data.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between gap-3 rounded-xl border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{report.title}</p>
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    {report.ticketNo} · {report.address}
                  </p>
                </div>
                <StatusBadge status={report.reportStatus} />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoneOverview;
