"use client";

import { RefreshCw, Wrench } from "lucide-react";
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
import { useAllTechnicians } from "@/hooks";
import { useUrlState } from "@/hooks/url-state.hook";
import { getApiErrorMessage } from "@/lib/error";

const DEFAULTS = {
  page: 1,
  limit: 10,
  searchTerm: "",
  expertise: "ALL",
  isAvailable: "ALL",
};

const EXPERTISE_OPTIONS = [
  { value: "Line maintenance", label: "Line maintenance" },
  { value: "Transformer repair", label: "Transformer repair" },
  { value: "Metering", label: "Metering" },
];

const AVAILABILITY_OPTIONS = [
  { value: "AVAILABLE", label: "Available" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "ON_HOLD", label: "On hold" },
  { value: "OFF_DUTY", label: "Off duty" },
];

const TechnicianList = () => {
  const { values, setValues, setFilters } = useUrlState(DEFAULTS);

  const params = {
    page: Number(values.page),
    limit: Number(values.limit),
    searchTerm: values.searchTerm || undefined,
    expertise:
      values.expertise !== "ALL" ? String(values.expertise) : undefined,
    isAvailable:
      values.isAvailable !== "ALL" ? String(values.isAvailable) : undefined,
  };

  const { data, isPending, isError, error, isFetching, refetch } =
    useAllTechnicians(params);

  const rows = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-6 m-10">
      <PageHeader
        title="All Technicians"
        description="Technicians registered under your substation."
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
          placeholder="Search by name or expertise..."
        />
        <div className="flex flex-wrap gap-3">
          <FilterSelect
            value={values.expertise}
            onValueChange={(value) => setFilters({ expertise: value })}
            options={EXPERTISE_OPTIONS}
            allLabel="Any expertise"
            placeholder="Expertise"
          />
          <FilterSelect
            value={values.isAvailable}
            onValueChange={(value) => setFilters({ isAvailable: value })}
            options={AVAILABILITY_OPTIONS}
            allLabel="Any availability"
            placeholder="Availability"
          />
        </div>
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
              title="No technicians found"
              description="Approved technician applications will show up here."
              icon={Wrench}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((tech) => (
                  <TableRow key={tech.id}>
                    <TableCell>
                      <p className="font-medium">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {tech.email}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">{tech.expertise}</TableCell>
                    <TableCell className="text-sm">
                      {tech.experienceYear} year(s)
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={tech.isAvailable} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={tech.verificationStatus} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tech.contactNumber ?? "—"}
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

export default TechnicianList;
