"use client";

import { CheckCircle2, ClipboardList, UserRound } from "lucide-react";
import Link from "next/link";
import StatsBarChart from "@/components/modules/charts/stats-bar-chart";
import PageHeader from "@/components/modules/common/page-header";
import StatCard from "@/components/modules/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTechnicianAnalytics, useUserGetMe } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";

const TechnicianOverview = () => {
  const { data: me } = useUserGetMe();
  const {
    data: analytics,
    isPending,
    isError,
    error,
    refetch,
  } = useTechnicianAnalytics();

  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
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
          Try again
        </Button>
      </div>
    );
  }

  const stats = analytics?.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${me?.data.name ?? "Technician"}`}
        description="Your assigned outage tickets and resolution progress."
        actions={
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/technician/assignments" />}
          >
            <ClipboardList className="size-4" />
            My assignments
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Total assignments"
          value={stats?.totalAssignment ?? 0}
          icon={ClipboardList}
        />
        <StatCard
          label="Resolved"
          value={stats?.totalResolvedAssignment ?? 0}
          description="Tickets marked as resolved"
          icon={CheckCircle2}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Assignment progress</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsBarChart
              data={[
                {
                  label: "Assigned",
                  value: stats?.totalAssignment ?? 0,
                },
                {
                  label: "Resolved",
                  value: stats?.totalResolvedAssignment ?? 0,
                },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="size-4 text-primary" />
              Your availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border p-3">
              <span className="text-sm text-muted-foreground">
                Current status
              </span>
              <span className="text-sm font-medium">
                {me?.data.technicianProfile?.isAvailable ?? "—"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border p-3">
              <span className="text-sm text-muted-foreground">Expertise</span>
              <span className="text-sm font-medium">
                {me?.data.technicianProfile?.expertise ?? "—"}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              nativeButton={false}
              render={<Link href="/technician/profile" />}
            >
              View profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechnicianOverview;
