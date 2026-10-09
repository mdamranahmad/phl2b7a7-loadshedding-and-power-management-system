"use client";

import {
    CalendarClock,
    Coins,
    FileWarning,
    PlugZap,
    Wallet,
    Wrench,
} from "lucide-react";
import Link from "next/link";
import StatsBarChart from "@/components/modules/charts/stats-bar-chart";
import EmptyState from "@/components/modules/common/empty-state";
import PageHeader from "@/components/modules/common/page-header";
import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import StatCard from "@/components/modules/common/stat-card";
import StatusBadge from "@/components/modules/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomerAnalytics, useLoadSheddingSchedule } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";

function OverviewSkeleton() {
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

const CustomerOverview = () => {
    const {
        data: analytics,
        isPending: isAnalyticsPending,
        isError: isAnalyticsError,
        error: analyticsError,
    } = useCustomerAnalytics();
    const {
        data: schedule,
        isPending: isSchedulePending,
        isError: isScheduleError,
    } = useLoadSheddingSchedule({
        limit: 5,
        sortBy: "startTime",
        sortOrder: "asc",
    });

    if (isAnalyticsPending) return <OverviewSkeleton />;

    const stats = analytics?.data;

    return (
        <div className="space-y-6 m-8">
            <PageHeader
                title="Customer Dashboard"
                description="Track your tokens, recharges and outage reports at a glance."
                actions={
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            className="w-full justify-center px-6"
                            nativeButton={false}
                            render={<Link href="/customer/report-outage" />}
                        >
                            <FileWarning className="size-4" />
                            Report Outage
                        </Button>
                        <Button
                            className="w-full justify-center px-6"
                            variant="outline"
                            nativeButton={false}
                            render={<Link href="/dashboard/my-tokens" />}
                        >
                            <Coins className="size-4" />
                            Buy Token
                        </Button>
                    </div>
                }
            />

            {isAnalyticsError ? (
                <Card>
                    <CardContent className="py-8 text-center text-sm text-muted-foreground">
                        {getApiErrorMessage(analyticsError)}
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        label="Total Tokens"
                        value={stats?.totalTokens ?? 0}
                        icon={Coins}
                    />
                    <StatCard
                        label="Unused Tokens"
                        value={stats?.totalUnusedTokens ?? 0}
                        description="Ready to redeem"
                        icon={PlugZap}
                    />
                    <StatCard
                        label="Total Recharge"
                        value={`৳${stats?.totalRechargeAmount ?? 0}`}
                        icon={Wallet}
                    />
                    <StatCard
                        label="Outage Reports"
                        value={stats?.totalOutageReports ?? 0}
                        description={`${stats?.totalResolvedOutageReports ?? 0} resolved`}
                        icon={Wrench}
                    />
                </div>
            )}

            <div className="grid gap-4 lg:grid-cols-5">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Activity overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StatsBarChart
                            data={[
                                {
                                    label: "Tokens",
                                    value: stats?.totalTokens ?? 0,
                                },
                                {
                                    label: "Unused",
                                    value: stats?.totalUnusedTokens ?? 0,
                                },
                                {
                                    label: "Reports",
                                    value: stats?.totalOutageReports ?? 0,
                                },
                                {
                                    label: "Resolved",
                                    value:
                                        stats?.totalResolvedOutageReports ?? 0,
                                },
                            ]}
                        />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarClock className="size-4 text-primary" />
                            Upcoming load-shedding
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {isSchedulePending ? (
                            skeletonKeys(3).map((key) => (
                                <Skeleton
                                    key={key}
                                    className="h-14 rounded-xl"
                                />
                            ))
                        ) : isScheduleError || !schedule?.data.length ? (
                            <EmptyState
                                title="No schedules yet"
                                description="Published load-shedding schedules for your area will appear here."
                                icon={CalendarClock}
                            />
                        ) : (
                            schedule.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between gap-3 rounded-xl border p-3"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {item.area?.name ?? "Your area"}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {new Date(
                                                item.startTime,
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                    <StatusBadge status={item.status} />
                                </div>
                            ))
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            nativeButton={false}
                            render={<Link href="/customer/schedule" />}
                        >
                            View full schedule
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CustomerOverview;
