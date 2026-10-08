import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";

export default function ScheduleBatchDetailLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-72" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {skeletonKeys(4).map((key) => (
          <Skeleton key={key} className="h-20 rounded-2xl" />
        ))}
      </div>
      <div className="space-y-3 rounded-2xl border p-4">
        {skeletonKeys(6).map((key) => (
          <Skeleton key={key} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}
