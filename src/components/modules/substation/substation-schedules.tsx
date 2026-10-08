"use client";

import { CalendarRange, Eye, Plus, RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/modules/common/empty-state";
import FilterSelect from "@/components/modules/common/filter-select";
import PageHeader from "@/components/modules/common/page-header";
import SearchInput from "@/components/modules/common/search-input";
import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import StatusBadge from "@/components/modules/common/status-badge";
import TablePagination from "@/components/modules/common/table-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  useDeleteScheduleBatch,
  usePublishScheduleBatch,
  useScheduleBatches,
} from "@/hooks";
import { useUrlState } from "@/hooks/url-state.hook";
import { getApiErrorMessage } from "@/lib/error";

const DEFAULTS = {
  page: 1,
  limit: 10,
  searchTerm: "",
  status: "ALL",
};

const STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "CANCELLED", label: "Cancelled" },
];

const SubstationSchedules = () => {
  const { values, setValues, setFilters } = useUrlState(DEFAULTS);
  const publishBatch = usePublishScheduleBatch();
  const deleteBatch = useDeleteScheduleBatch();

  const params = {
    page: Number(values.page),
    limit: Number(values.limit),
    searchTerm: values.searchTerm || undefined,
    status:
      values.status !== "ALL"
        ? (values.status as "DRAFT" | "PUBLISHED" | "CANCELLED")
        : undefined,
  };

  const { data, isPending, isError, error, isFetching, refetch } =
    useScheduleBatches(params);

  const rows = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handlePublish = async (batchId: string) => {
    try {
      await publishBatch.mutateAsync(batchId);
      toast.add({
        title: "Schedule published",
        description: "Customers can now see the new load-shedding slots.",
        type: "success",
      });
    } catch (err) {
      toast.add({
        title: "Could not publish",
        description: getApiErrorMessage(err),
        type: "error",
      });
    }
  };

  const handleDelete = async (batchId: string) => {
    try {
      await deleteBatch.mutateAsync(batchId);
      toast.add({
        title: "Batch deleted",
        description: "The draft schedule batch was removed.",
        type: "success",
      });
    } catch (err) {
      toast.add({
        title: "Could not delete batch",
        description: getApiErrorMessage(err),
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule Batches"
        description="Load-shedding batches generated for your substation."
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => void refetch()}
              disabled={isFetching}
            >
              <RefreshCw className="size-4" />
              Refresh
            </Button>
            <Button render={<Link href="/substation/schedules/generate" />}>
              <Plus className="size-4" />
              Generate schedule
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={values.searchTerm}
          onChange={(value) => setFilters({ searchTerm: value })}
          placeholder="Search batches..."
        />
        <FilterSelect
          value={values.status}
          onValueChange={(value) => setFilters({ status: value })}
          options={STATUS_OPTIONS}
          allLabel="All statuses"
          placeholder="Status"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {isPending ? (
            <div className="space-y-3 p-4">
              {skeletonKeys(5).map((key) => (
                <Skeleton key={key} className="h-12 w-full" />
              ))}
            </div>
          ) : isError ? (
            <div className="space-y-4 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                {getApiErrorMessage(error)}
              </p>
              <Button variant="outline" onClick={() => void refetch()}>
                <RefreshCw className="size-4" />
                Try again
              </Button>
            </div>
          ) : rows.length === 0 ? (
            <EmptyState
              title="No schedule batches"
              description="Generate a schedule to create your first batch."
              icon={CalendarRange}
              action={
                <Button render={<Link href="/substation/schedules/generate" />}>
                  <Plus className="size-4" />
                  Generate schedule
                </Button>
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch</TableHead>
                  <TableHead>Window</TableHead>
                  <TableHead>Durations</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell>
                      <p className="font-medium">
                        {batch.title ?? "Untitled batch"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {batch.schedules?.length ?? 0} slots
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(batch.batchStartTime).toLocaleString()}
                      <span className="text-muted-foreground">
                        {" "}
                        → {new Date(batch.batchEndTime).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {Math.round(batch.scheduleDuration / 60)}m schedule /{" "}
                      {Math.round(batch.outageSlotDuration / 60)}m outage
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={batch.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          render={
                            <Link href={`/substation/schedules/${batch.id}`} />
                          }
                          aria-label="View batch"
                        >
                          <Eye className="size-4" />
                          View
                        </Button>
                        {batch.status === "DRAFT" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => void handlePublish(batch.id)}
                              disabled={publishBatch.isPending}
                            >
                              Publish
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => void handleDelete(batch.id)}
                              disabled={deleteBatch.isPending}
                              aria-label="Delete batch"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {!isPending && !isError && rows.length > 0 && (
        <TablePagination
          page={Number(values.page)}
          totalPages={totalPages}
          onPageChange={(page) => setValues({ page })}
        />
      )}
    </div>
  );
};

export default SubstationSchedules;
