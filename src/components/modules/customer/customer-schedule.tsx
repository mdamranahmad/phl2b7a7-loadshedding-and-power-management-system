"use client";

import { CalendarClock, RefreshCw } from "lucide-react";
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
import { useLoadSheddingSchedule } from "@/hooks";
import { useUrlState } from "@/hooks/url-state.hook";
import { getApiErrorMessage } from "@/lib/error";

const DEFAULTS = {
  page: 1,
  limit: 10,
  searchTerm: "",
  status: "ALL",
  sortBy: "startTime",
  sortOrder: "asc",
};

const STATUS_OPTIONS = [
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

function TableLoading({
  columns,
  rows = 6,
}: {
  columns: number;
  rows?: number;
}) {
  return (
    <div className="space-y-3 p-4">
      {skeletonKeys(rows).map((rowKey) => (
        <div key={rowKey} className="flex gap-3">
          {skeletonKeys(columns).map((cellKey) => (
            <Skeleton key={cellKey} className="h-5 flex-1 rounded-md" />
          ))}
        </div>
      ))}
    </div>
  );
}

const CustomerSchedule = () => {
  const { values, setValues, setFilters } = useUrlState(DEFAULTS);

  const params = {
    page: Number(values.page),
    limit: Number(values.limit),
    searchTerm: values.searchTerm || undefined,
    sortBy: String(values.sortBy),
    sortOrder:
      values.sortOrder === "desc" ? ("desc" as const) : ("asc" as const),
  };

  // The backend's `status` filter compares against `searchTerm` (a bug), so
  // we omit it from the request and filter client-side below.
  const { data, isPending, isError, error, isFetching, refetch } =
    useLoadSheddingSchedule(params);

  const rows = (data?.data ?? []).filter((item) =>
    values.status === "ALL" ? true : item.status === values.status,
  );
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Load-Shedding Schedule"
        description="Published outage schedules for your area."
        actions={
          <Button
            variant="outline"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={values.searchTerm}
          onChange={(value) => setFilters({ searchTerm: value })}
          placeholder="Search by area name..."
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
            <TableLoading columns={4} />
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
              title="No schedules found"
              description="There are no load-shedding schedules matching your filters."
              icon={CalendarClock}
              action={
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={
                    <Link href="/customer/report-outage">
                      Report an outage instead
                    </Link>
                  }
                />
              }
            />
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
                {rows.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.area?.name ?? "—"}
                    </TableCell>
                    <TableCell>
                      {new Date(item.startTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item.endTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
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

export default CustomerSchedule;
