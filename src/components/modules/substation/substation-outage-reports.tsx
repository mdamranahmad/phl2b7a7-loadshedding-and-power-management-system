"use client";

import { FileWarning, RefreshCw, UserPlus } from "lucide-react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  useAllTechnicians,
  useAssignTechnician,
  useOutageReportById,
  useOutageReports,
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
  { value: "APPROVED", label: "Approved" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "REOPENED", label: "Reopened" },
];

function AssignDialog({
  reportId,
  open,
  onOpenChange,
}: {
  reportId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: report, isPending: isReportPending } = useOutageReportById(
    open ? reportId : "",
  );
  const { data: technicians, isPending: isTechPending } = useAllTechnicians({
    limit: 50,
  });
  const assignTechnician = useAssignTechnician();
  const [technicianId, setTechnicianId] = useState("");

  const handleAssign = async () => {
    if (!technicianId) return;
    try {
      await assignTechnician.mutateAsync({
        outageReportId: reportId,
        payload: { technicianId },
      });
      toast.add({
        title: "Technician assigned",
        description: "The technician has been notified of this ticket.",
        type: "success",
      });
      setTechnicianId("");
      onOpenChange(false);
    } catch (error) {
      toast.add({
        title: "Could not assign technician",
        description: getApiErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign technician</DialogTitle>
          <DialogDescription>
            {isReportPending
              ? "Loading report..."
              : `Ticket ${report?.data.ticketNo ?? ""} — ${report?.data.title ?? ""}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Available technicians</p>
            <Select
              value={technicianId}
              onValueChange={(next) => setTechnicianId(String(next))}
            >
              <SelectTrigger className="w-full" aria-label="Select technician">
                <SelectValue placeholder="Choose a technician" />
              </SelectTrigger>
              <SelectContent>
                {isTechPending ? (
                  <SelectItem value="__loading" disabled>
                    Loading technicians...
                  </SelectItem>
                ) : (
                  (technicians?.data ?? [])
                    .filter(
                      (tech) =>
                        tech.verificationStatus === "APPROVED" &&
                        tech.isAvailable !== "OFF_DUTY",
                    )
                    .map((tech) => (
                      <SelectItem key={tech.id} value={tech.id}>
                        {tech.name} · {tech.expertise} ({tech.isAvailable})
                      </SelectItem>
                    ))
                )}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            Only approved technicians who are not off duty are listed.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => void handleAssign()}
            disabled={!technicianId || assignTechnician.isPending}
          >
            {assignTechnician.isPending ? "Assigning..." : "Assign technician"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const SubstationOutageReports = () => {
  const { values, setValues, setFilters } = useUrlState(DEFAULTS);
  const [assignId, setAssignId] = useState<string | null>(null);

  const params = {
    page: Number(values.page),
    limit: Number(values.limit),
    searchTerm: values.searchTerm || undefined,
    reportStatus:
      values.reportStatus !== "ALL"
        ? (values.reportStatus as
            | "APPROVED"
            | "ASSIGNED"
            | "RESOLVED"
            | "REOPENED")
        : undefined,
  };

  const { data, isPending, isError, error, isFetching, refetch } =
    useOutageReports(params);

  const rows = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-6 m-10">
      <PageHeader
        title="Outage Reports"
        description="Approved outage tickets for your substation — assign technicians to resolve them."
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
              description="Approved reports needing assignment will appear here."
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
                  <TableHead>Technician</TableHead>
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
                    <TableCell className="text-sm">
                      {report.technician?.name ?? (
                        <span className="text-muted-foreground">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {(report.reportStatus === "APPROVED" ||
                        report.reportStatus === "REOPENED") && (
                        <Button
                          size="sm"
                          onClick={() => setAssignId(report.id)}
                        >
                          <UserPlus className="size-4" />
                          Assign
                        </Button>
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

      {assignId && (
        <AssignDialog
          reportId={assignId}
          open={!!assignId}
          onOpenChange={(open) => {
            if (!open) setAssignId(null);
          }}
        />
      )}
    </div>
  );
};

export default SubstationOutageReports;
