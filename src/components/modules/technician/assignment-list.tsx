"use client";

import { ClipboardList, RefreshCw } from "lucide-react";
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
import { useGetAssignments, useResolveAssignment } from "@/hooks";
import { useUrlState } from "@/hooks/url-state.hook";
import { getApiErrorMessage } from "@/lib/error";

const DEFAULTS = {
  page: 1,
  limit: 10,
  searchTerm: "",
  reportStatus: "ALL",
};

const STATUS_OPTIONS = [
  { value: "APPROVED", label: "Approved" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "REOPENED", label: "Reopened" },
];

const AssignmentList = () => {
  const { values, setValues, setFilters } = useUrlState(DEFAULTS);
  const resolveAssignment = useResolveAssignment();

  const params = {
    page: Number(values.page),
    limit: Number(values.limit),
    searchTerm: values.searchTerm || undefined,
    reportStatus:
      values.reportStatus !== "ALL"
        ? (values.reportStatus as "APPROVED" | "ASSIGNED" | "RESOLVED")
        : undefined,
  };

  const { data, isPending, isError, error, isFetching, refetch } =
    useGetAssignments(params);

  const rows = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handleResolve = async (reportId: string) => {
    try {
      await resolveAssignment.mutateAsync(reportId);
      toast.add({
        title: "Assignment resolved",
        description: "The ticket has been marked as resolved.",
        type: "success",
      });
    } catch (err) {
      toast.add({
        title: "Could not resolve assignment",
        description: getApiErrorMessage(err),
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Assignments"
        description="Outage tickets assigned to you by the substation manager."
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
          placeholder="Search by ticket or address..."
        />
        <FilterSelect
          value={values.reportStatus}
          onValueChange={(value) => setFilters({ reportStatus: value })}
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
              title="No assignments"
              description="Tickets assigned to you will show up here."
              icon={ClipboardList}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-mono text-xs">
                      {report.ticketNo}
                    </TableCell>
                    <TableCell className="max-w-48">
                      <p className="truncate font-medium">{report.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {report.description}
                      </p>
                    </TableCell>
                    <TableCell className="max-w-40">
                      <p className="truncate text-sm">{report.address}</p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={report.severity} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={report.reportStatus} />
                    </TableCell>
                    <TableCell className="text-right">
                      {report.reportStatus !== "RESOLVED" ? (
                        <Button
                          size="sm"
                          onClick={() => void handleResolve(report.id)}
                          disabled={resolveAssignment.isPending}
                        >
                          Mark resolved
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Done
                        </span>
                      )}
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

export default AssignmentList;
