import { cn } from "cn";
import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  // Outage report status
  PENDING: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  APPROVED: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  ASSIGNED: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  RESOLVED: "bg-green-500/15 text-green-600 dark:text-green-400",
  REOPENED: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  // Schedule status
  DRAFT: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
  PUBLISHED: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  CANCELLED: "bg-red-500/15 text-red-600 dark:text-red-400",
  UPCOMING: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  ONGOING: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  COMPLETED: "bg-green-500/15 text-green-600 dark:text-green-400",
  // Payment / token status
  PAID: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  UNPAID: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  FAILED: "bg-red-500/15 text-red-600 dark:text-red-400",
  REFUNDED: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  USED: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
  UNUSED: "bg-green-500/15 text-green-600 dark:text-green-400",
  // Technician status
  AVAILABLE: "bg-green-500/15 text-green-600 dark:text-green-400",
  OFF_DUTY: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
  IN_PROGRESS: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  ON_HOLD: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  REJECTED: "bg-red-500/15 text-red-600 dark:text-red-400",
  // Severity
  TOTAL_BLACKOUT: "bg-red-500/15 text-red-600 dark:text-red-400",
  PARTIAL_POWER: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  DIM_LIGHTS: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  NEIGHBORHOOD_WIDE: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  OTHERS: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
};

interface IStatusBadgeProps {
  status: string;
  label?: string;
}

const StatusBadge = ({ status, label }: IStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent",
        STATUS_STYLES[status] ?? "bg-muted text-muted-foreground",
      )}
    >
      {label ?? status.replaceAll("_", " ")}
    </Badge>
  );
};

export default StatusBadge;
