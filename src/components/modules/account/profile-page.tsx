"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Hash,
  IdCard,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Zap,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/modules/common/page-header";
import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserGetMe } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";
import type { IUser } from "@/types";

const ROLE_LABELS: Record<string, string> = {
  CUSTOMER: "Customer",
  TECHNICIAN: "Technician",
  ZONE_MANAGER: "Zonal Manager",
  SUBSTATION_MANAGER: "Substation Manager",
};

interface IRow {
  icon: typeof Mail;
  label: string;
  value: string;
}

function profileRows(user: IUser): IRow[] {
  const profile =
    user.customerProfile ??
    user.technicianProfile ??
    user.subStationManager ??
    user.zoneManager;

  const rows: IRow[] = [
    { icon: Mail, label: "Email", value: user.email },
    {
      icon: BadgeCheck,
      label: "Email verified",
      value: user.emailVerified ? "Verified" : "Not verified",
    },
    {
      icon: CalendarDays,
      label: "Member since",
      value: new Date(user.createdAt).toLocaleDateString(),
    },
  ];

  if (user.role === "CUSTOMER") {
    rows.push(
      {
        icon: Zap,
        label: "Meter number",
        value: user.customerProfile?.meterNumber ?? "—",
      },
      {
        icon: Hash,
        label: "NID",
        value: user.nid ?? "—",
      },
    );
  }

  if (user.role === "TECHNICIAN") {
    rows.push(
      {
        icon: BriefcaseBusiness,
        label: "Expertise",
        value: user.technicianProfile?.expertise ?? "—",
      },
      {
        icon: CalendarDays,
        label: "Experience",
        value: user.technicianProfile
          ? `${user.technicianProfile.experienceYear} year(s)`
          : "—",
      },
    );
  }

  if (user.role === "ZONE_MANAGER" || user.role === "SUBSTATION_MANAGER") {
    rows.push({
      icon: IdCard,
      label: "Employee ID",
      value:
        user.subStationManager?.employeeId ??
        user.zoneManager?.employeeId ??
        "—",
    });
  }

  rows.push(
    {
      icon: MapPin,
      label: "Address",
      value: profile?.address || "—",
    },
    {
      icon: Phone,
      label: "Contact number",
      value: profile?.contactNumber || "—",
    },
  );

  return rows;
}

const ProfilePage = () => {
  const { data, isPending, isError, error, refetch, isFetching } =
    useUserGetMe();

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Skeleton className="h-9 w-56" />
        <div className="space-y-4 rounded-2xl border p-6">
          {skeletonKeys(6).map((key) => (
            <div key={key} className="flex items-center gap-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">
          {getApiErrorMessage(error)}
        </p>
        <Button
          variant="outline"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          <RefreshCw className="size-4" />
          Try again
        </Button>
      </div>
    );
  }

  const user = data.data;
  const rows = profileRows(user);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <PageHeader
        title="Profile & Settings"
        description="Your account details as registered with the utility."
      />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-lg font-semibold text-primary">
              {user.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>
                {ROLE_LABELS[user.role ?? ""] ?? user.role} ·{" "}
                <span
                  className={
                    user.status === "ACTIVE"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600"
                  }
                >
                  {user.status}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="divide-y divide-border">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 py-3"
              >
                <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                  <row.icon className="size-4" />
                  {row.label}
                </dt>
                <dd className="text-sm font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Need to change something?{" "}
        <Link href="/contact" className="text-primary hover:underline">
          Contact support
        </Link>
      </p>
    </div>
  );
};

export default ProfilePage;
