"use client";

import { Check, Eye, FileWarning, RefreshCw } from "lucide-react";
import { useState } from "react";
import EmptyState from "@/components/modules/common/empty-state";
import FilterSelect from "@/components/modules/common/filter-select";
import PageHeader from "@/components/modules/common/page-header";
import SearchInput from "@/components/modules/common/search-input";
import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import StatusBadge from "@/components/modules/common/status-badge";
import TablePagination from "@/components/modules/common/table-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  useApproveOutageReport,
  useZonalOutageReportById,
  useZonalOutageReports,
} from "@/hooks";
import { useUrlState } from "@/hooks/url-state.hook";
import { getApiErrorMessage } from "@/lib/error";

const DEFAULTS = {
  page: 1,
  limit: 10,
  searchTerm: "",
  reportStatus: "ALL",
};

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "REOPENED", label: "Reopened" },
];

function ReportDetailDialog({
  reportId,
  open,
  onOpenChange,
}: {
  reportId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data, isPending } = useZonalOutageReportById(open ? reportId : "");
  const report = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Outage report</DialogTitle>
          <DialogDescription>Full details for this ticket.</DialogDescription>
        </DialogHeader>
        {isPending ? (
          <div className="space-y-3">
            {skeletonKeys(4).map((key) => (
              <Skeleton key={key} className="h-5 w-full" />
            ))}
          </div>
        ) : report ? (
          <dl className="divide-y divide-border rounded-xl border">
            {[
              ["Ticket", report.ticketNo],
              ["Title", report.title],
              ["Severity", report.severity.replaceAll("_", " ")],
              ["Status", report.reportStatus.replaceAll("_", " ")],
              ["Address", report.address],
              ["Started at", new Date(report.outageStartTime).toLocaleString()],
              ["Ongoing", report.isOngoing ? "Yes" : "No"],
              ["Reporter", report.reporter?.name ?? "—"],
              ["Technician", report.technician?.name ?? "Not assigned"],
              ["Description", report.description],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4 px-3 py-2"
              >
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-right text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">
            Could not load this report.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

const ZonalOutageReports = () => {
  const { values, setValues, setFilters } = useUrlState(DEFAULTS);
  const approveReport = useApproveOutageReport();
  const [detailId, setDetailId] = useState<string | null>(null);

  const params = {
    page: Number(values.page),
    limit: Number(values.limit),
    searchTerm: values.searchTerm || undefined,
    reportStatus:
      values.reportStatus !== "ALL"
        ? (values.reportStatus as
            | "PENDING"
            | "APPROVED"
            | "ASSIGNED"
            | "RESOLVED"
            | "REOPENED")
        : undefined,
  };

  const { data, isPending, isError, error, isFetching, refetch } =
    useZonalOutageReports(params);

  const rows = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handleApprove = async (reportId: string) => {
    try {
      await approveReport.mutateAsync(reportId);
      toast.add({
        title: "Report approved",
        description: "The report was forwarded to the substation manager.",
        type: "success",
      });
    } catch (err) {
      toast.add({
        title: "Could not approve report",
        description: getApiErrorMessage(err),
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-6 m-10">
      <PageHeader
        title="Outage Reports"
        description="Review and approve outage reports from customers in your zone."
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
              title="No outage reports"
              description="Reports submitted by customers will appear here."
              icon={FileWarning}
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
                  <TableHead className="text-right">Actions</TableHead>
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
                        {new Date(report.createdAt).toLocaleDateString()}
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
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDetailId(report.id)}
                        >
                          <Eye className="size-4" />
                          View
                        </Button>
                        {report.reportStatus === "PENDING" && (
                          <Button
                            size="sm"
                            onClick={() => void handleApprove(report.id)}
                            disabled={approveReport.isPending}
                          >
                            <Check className="size-4" />
                            Approve
                          </Button>
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

      {detailId && (
        <ReportDetailDialog
          reportId={detailId}
          open={!!detailId}
          onOpenChange={(open) => {
            if (!open) setDetailId(null);
          }}
        />
      )}
    </div>
  );
};

export default ZonalOutageReports;
