import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";

export default function TechniciansLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-56" />
      <div className="flex gap-3">
        <Skeleton className="h-9 w-full max-w-xs" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
      </div>
      <div className="space-y-3 rounded-2xl border p-4">
        {skeletonKeys(6).map((key) => (
          <Skeleton key={key} className="h-11 w-full" />
        ))}
      </div>
    </div>
  );
}
