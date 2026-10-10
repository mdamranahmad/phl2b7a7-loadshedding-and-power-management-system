"use client";

import { ArrowLeft, CalendarRange, Check, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/modules/common/page-header";
import StatusBadge from "@/components/modules/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { usePublishScheduleBatch, useScheduleBatchById } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";

const ScheduleBatchDetail = ({
  scheduleBatchId,
}: {
  scheduleBatchId: string;
}) => {
  const router = useRouter();
  const { data, isPending, isError, error, refetch } =
    useScheduleBatchById(scheduleBatchId);
  const publishBatch = usePublishScheduleBatch();

  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="space-y-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">
          {getApiErrorMessage(error)}
        </p>
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => void refetch()}>
            <RefreshCw className="size-4" />
            Try again
          </Button>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/substation/schedules" />}
          >
            <ArrowLeft className="size-4" />
            Back to batches
          </Button>
        </div>
      </div>
    );
  }

  const batch = data.data;
  const schedules = batch.schedules ?? [];

  const handlePublish = async () => {
    try {
      await publishBatch.mutateAsync(batch.id);
      toast.add({
        title: "Schedule published",
        description: "Customers can now see these load-shedding slots.",
        type: "success",
      });
      router.refresh();
    } catch (err) {
      toast.add({
        title: "Could not publish",
        description: getApiErrorMessage(err),
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-6 m-10">
      <PageHeader
        title={batch.title ?? "Schedule batch"}
        description={`Created ${new Date(batch.createdAt).toLocaleString()} by ${
          batch.createdBy?.name ?? "a manager"
        }.`}
        actions={
          <>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/substation/schedules" />}
            >
              <ArrowLeft className="size-4" />
              All batches
            </Button>
            {batch.status === "DRAFT" && (
              <Button
                onClick={() => void handlePublish()}
                disabled={publishBatch.isPending}
              >
                <Check className="size-4" />
                {publishBatch.isPending ? "Publishing..." : "Publish batch"}
              </Button>
            )}
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card size="sm">
          <CardContent className="space-y-1">
            <p className="text-sm text-muted-foreground">Status</p>
            <StatusBadge status={batch.status} />
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="space-y-1">
            <p className="text-sm text-muted-foreground">Window</p>
            <p className="text-sm font-medium">
              {new Date(batch.batchStartTime).toLocaleString()}
              {" → "}
              {new Date(batch.batchEndTime).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="space-y-1">
            <p className="text-sm text-muted-foreground">Schedule duration</p>
            <p className="text-sm font-medium">
              {Math.round(batch.scheduleDuration / 60)} minutes
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="space-y-1">
            <p className="text-sm text-muted-foreground">Outage slot</p>
            <p className="text-sm font-medium">
              {Math.round(batch.outageSlotDuration / 60)} minutes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarRange className="size-4 text-primary" />
            Generated slots ({schedules.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {schedules.length === 0 ? (
            <p className="px-6 pb-6 text-sm text-muted-foreground">
              This batch has no individual schedule slots.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead>Starts</TableHead>
                  <TableHead>Ends</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell className="font-medium">
                      {slot.area?.name ?? "—"}
                    </TableCell>
                    <TableCell>
                      {new Date(slot.startTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(slot.endTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={slot.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleBatchDetail;
