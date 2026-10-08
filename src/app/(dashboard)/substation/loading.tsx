import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubstationLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-72" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {skeletonKeys(8).map((key) => (
          <Skeleton key={key} className="h-32 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <Skeleton className="h-72 rounded-2xl lg:col-span-3" />
        <Skeleton className="h-72 rounded-2xl lg:col-span-2" />
      </div>
    </div>
  );
}
