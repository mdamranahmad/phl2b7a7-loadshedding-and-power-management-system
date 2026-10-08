import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerScheduleLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-72" />
      <div className="flex gap-3">
        <Skeleton className="h-9 w-full max-w-xs" />
        <Skeleton className="h-9 w-44" />
      </div>
      <div className="rounded-2xl border p-4">
        <div className="space-y-3">
          {skeletonKeys(7).map((key) => (
            <Skeleton key={key} className="h-6 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
