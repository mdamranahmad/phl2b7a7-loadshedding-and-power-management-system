import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";

export default function GenerateScheduleLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {skeletonKeys(3).map((key) => (
          <Skeleton key={key} className="size-8 rounded-full" />
        ))}
      </div>
      <div className="space-y-4 rounded-2xl border p-6">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  );
}
