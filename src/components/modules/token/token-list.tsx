"use client";

import { Coins, Copy, RefreshCw } from "lucide-react";
import EmptyState from "@/components/modules/common/empty-state";
import FilterSelect from "@/components/modules/common/filter-select";
import SearchInput from "@/components/modules/common/search-input";
import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import StatusBadge from "@/components/modules/common/status-badge";
import TablePagination from "@/components/modules/common/table-pagination";
import { PayUnpaidButton } from "@/components/modules/token/token-cards";
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
import { useMyTokens } from "@/hooks";
import { useUrlState } from "@/hooks/url-state.hook";
import { getApiErrorMessage } from "@/lib/error";
import type { TMeterType, TPaymentStatus } from "@/types";

const DEFAULTS = {
  page: 1,
  limit: 10,
  searchTerm: "",
  status: "ALL",
  meterType: "ALL",
};

const PAYMENT_STATUS_OPTIONS = [
  { value: "PAID", label: "Paid" },
  { value: "UNPAID", label: "Unpaid" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "Refunded" },
];

const METER_TYPE_OPTIONS = [
  { value: "ONLINE_PREPAID", label: "Online prepaid" },
  { value: "ONLINE_POSTPAID", label: "Online postpaid" },
  { value: "OFFLINE_PREPAID", label: "Offline prepaid" },
  { value: "OFFLINE_POSTPAID", label: "Offline postpaid" },
];

function copyToken(tokenNo: string) {
  void navigator.clipboard.writeText(tokenNo).then(() => {
    toast.add({
      title: "Copied",
      description: "Token number copied to clipboard.",
      type: "success",
    });
  });
}

export function TokenList() {
  const { values, setValues, setFilters } = useUrlState(DEFAULTS);

  const params = {
    page: Number(values.page),
    limit: Number(values.limit),
    searchTerm: values.searchTerm || undefined,
    status:
      values.status !== "ALL" ? (values.status as TPaymentStatus) : undefined,
    meterType:
      values.meterType !== "ALL" ? (values.meterType as TMeterType) : undefined,
  };

  const { data, isPending, isError, error, isFetching, refetch } =
    useMyTokens(params);

  const rows = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={values.searchTerm}
          onChange={(value) => setFilters({ searchTerm: value })}
          placeholder="Search by token or meter number..."
        />
        <div className="flex flex-wrap gap-3">
          <FilterSelect
            value={values.status}
            onValueChange={(value) => setFilters({ status: value })}
            options={PAYMENT_STATUS_OPTIONS}
            allLabel="All payments"
            placeholder="Payment"
          />
          <FilterSelect
            value={values.meterType}
            onValueChange={(value) => setFilters({ meterType: value })}
            options={METER_TYPE_OPTIONS}
            allLabel="All meters"
            placeholder="Meter type"
          />
          <Button
            variant="outline"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isPending ? (
            <div className="space-y-3 p-4">
              {skeletonKeys(5).map((key) => (
                <Skeleton key={key} className="h-10 w-full" />
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
              title="No tokens yet"
              description="Buy your first prepaid token and it will appear here."
              icon={Coins}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token number</TableHead>
                  <TableHead>Meter</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Token status</TableHead>
                  <TableHead>Purchased</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((token) => (
                  <TableRow key={token.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">
                          {token.tokenNo}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Copy token number"
                          onClick={() => copyToken(token.tokenNo)}
                        >
                          <Copy className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {token.meterNo}
                    </TableCell>
                    <TableCell>৳{token.rechargeAmount}</TableCell>
                    <TableCell>
                      <StatusBadge status={token.payment?.status ?? "UNPAID"} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={token.tokenStatus} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(token.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {token.payment?.status === "UNPAID" ? (
                        <PayUnpaidButton tokenId={token.id} />
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
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
}
