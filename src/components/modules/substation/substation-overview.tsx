"use client";

import {
  Building2,
  CalendarRange,
  FileWarning,
  House,
  RefreshCw,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import StatsBarChart from "@/components/modules/charts/stats-bar-chart";
import PageHeader from "@/components/modules/common/page-header";
import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import StatCard from "@/components/modules/common/stat-card";
import StatusBadge from "@/components/modules/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useScheduleBatches, useSubStationAnalytics } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";

const SubstationOverview = () => {
  const {
    data: analytics,
    isPending,
    isError,
    error,
    refetch,
  } = useSubStationAnalytics();
  const { data: batches, isPending: isBatchesPending } = useScheduleBatches({
    limit: 4,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skeletonKeys(4).map((key) => (
            <Skeleton key={key} className="h-32 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-2xl" />
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
        title="Substation Manager Dashboard"
        description="Feeders, customers, schedules and open issues for your substation."
        actions={
          <>
            <Button render={<Link href="/substation/schedules/generate" />}>
              <CalendarRange className="size-4" />
              Generate schedule
            </Button>
            <Button
              variant="outline"
              render={<Link href="/substation/outage-reports" />}
            >
              <FileWarning className="size-4" />
              Outage reports
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Feeders"
          value={stats?.totalFeeders ?? 0}
          description={`${stats?.totalAreas ?? 0} areas covered`}
          icon={Zap}
        />
        <StatCard
          label="Houses"
          value={stats?.totalHouses ?? 0}
          description={`${stats?.totalCustomers ?? 0} customers`}
          icon={House}
        />
        <StatCard
          label="Available technicians"
          value={stats?.totalAvailableTechnicians ?? 0}
          icon={Wrench}
        />
        <StatCard
          label="Open issues"
          value={stats?.totalOngoinIssues ?? 0}
          description={`${stats?.totalAssignedIssue ?? 0} assigned`}
          icon={FileWarning}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Outage reports"
          value={stats?.totalOutageReports ?? 0}
          description={`${stats?.totalResolvedIssue ?? 0} resolved`}
          icon={Building2}
        />
        <StatCard
          label="Schedule batches"
          value={stats?.totalOutageScheduleBatchs ?? 0}
          description={`${stats?.totalOngoinOutageScheduleBatchs ?? 0} ongoing`}
          icon={CalendarRange}
        />
        <StatCard
          label="Customers"
          value={stats?.totalCustomers ?? 0}
          icon={Users}
        />
        <StatCard label="Areas" value={stats?.totalAreas ?? 0} icon={House} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Issue pipeline</CardTitle>
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

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <CalendarRange className="size-4 text-primary" />
                Latest batches
              </span>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/substation/schedules" />}
              >
                View all
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isBatchesPending ? (
              skeletonKeys(3).map((key) => (
                <Skeleton key={key} className="h-14 rounded-xl" />
              ))
            ) : !batches?.data.length ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No batches yet — generate your first schedule.
              </p>
            ) : (
              batches.data.map((batch) => (
                <div
                  key={batch.id}
                  className="flex items-center justify-between gap-3 rounded-xl border p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {batch.title ?? "Untitled batch"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {new Date(batch.batchStartTime).toLocaleString()}
                    </p>
                  </div>
                  <StatusBadge status={batch.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubstationOverview;
