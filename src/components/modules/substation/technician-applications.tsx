"use client";

import { Check, FileText, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EmptyState from "@/components/modules/common/empty-state";
import PageHeader from "@/components/modules/common/page-header";
import SearchInput from "@/components/modules/common/search-input";
import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useApproveTechnician, useGetPendingTechApplications } from "@/hooks";
import { useUrlState } from "@/hooks/url-state.hook";
import { getApiErrorMessage } from "@/lib/error";

const DEFAULTS = {
  page: 1,
  limit: 10,
  searchTerm: "",
};

function RejectDialog({
  technicianId,
  open,
  onOpenChange,
}: {
  technicianId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const approveTechnician = useApproveTechnician();
  const [reason, setReason] = useState("");

  const handleReject = async () => {
    try {
      await approveTechnician.mutateAsync({
        technicianId,
        verificationStatus: "REJECTED",
        rejectReason: reason || "Did not meet the requirements.",
      });
      toast.add({
        title: "Application rejected",
        description: "The applicant will be notified by email.",
        type: "success",
      });
      setReason("");
      onOpenChange(false);
    } catch (error) {
      toast.add({
        title: "Could not reject application",
        description: getApiErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject application</DialogTitle>
          <DialogDescription>
            The applicant will receive your reason by email.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          rows={4}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="e.g. Insufficient experience for the required workload."
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => void handleReject()}
            disabled={approveTechnician.isPending}
          >
            {approveTechnician.isPending
              ? "Rejecting..."
              : "Reject application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const TechnicianApplications = () => {
  const { values, setValues, setFilters } = useUrlState(DEFAULTS);
  const approveTechnician = useApproveTechnician();
  const [rejectId, setRejectId] = useState<string | null>(null);

  const params = {
    page: Number(values.page),
    limit: Number(values.limit),
    searchTerm: values.searchTerm || undefined,
  };

  const { data, isPending, isError, error, isFetching, refetch } =
    useGetPendingTechApplications(params);

  const rows = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handleApprove = async (technicianId: string) => {
    try {
      await approveTechnician.mutateAsync({
        technicianId,
        verificationStatus: "APPROVED",
      });
      toast.add({
        title: "Application approved",
        description: "The technician can now receive assignments.",
        type: "success",
      });
    } catch (err) {
      toast.add({
        title: "Could not approve application",
        description: getApiErrorMessage(err),
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Technician Applications"
        description="Pending applications from technicians awaiting review."
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

      <SearchInput
        value={values.searchTerm}
        onChange={(value) => setFilters({ searchTerm: value })}
        placeholder="Search applicants..."
      />

      <Card>
        <CardContent className="p-0">
          {isPending ? (
            <div className="space-y-3 p-4">
              {skeletonKeys(4).map((key) => (
                <Skeleton key={key} className="h-14 w-full" />
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
              title="No pending applications"
              description="New technician applications will appear here for review."
              icon={FileText}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <p className="font-medium">{application.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {application.email}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {application.expertise}
                    </TableCell>
                    <TableCell className="text-sm">
                      {application.experienceYear} year(s)
                    </TableCell>
                    <TableCell className="max-w-40">
                      <p className="truncate text-sm">{application.address}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {application.resumeUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            render={
                              // biome-ignore lint/a11y/useAnchorContent: Base UI renders the "Resume" label as the anchor's children via the Button
                              <a
                                href={application.resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                              />
                            }
                          >
                            <FileText className="size-4" />
                            Resume
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => void handleApprove(application.id)}
                          disabled={approveTechnician.isPending}
                        >
                          <Check className="size-4" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setRejectId(application.id)}
                        >
                          <X className="size-4" />
                          Reject
                        </Button>
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

      {rejectId && (
        <RejectDialog
          technicianId={rejectId}
          open={!!rejectId}
          onOpenChange={(open) => {
            if (!open) setRejectId(null);
          }}
        />
      )}

      <p className="text-sm text-muted-foreground">
        Need to check an already-reviewed technician?{" "}
        <Link
          href="/substation/technicians"
          className="text-primary hover:underline"
        >
          View all technicians
        </Link>
      </p>
    </div>
  );
};

export default TechnicianApplications;
