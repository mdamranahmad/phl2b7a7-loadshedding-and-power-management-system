import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyTokensLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-48" />
      <div className="grid gap-4 lg:grid-cols-2">
        {skeletonKeys(2).map((key) => (
          <div key={key} className="space-y-4 rounded-2xl border p-6">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-36" />
          </div>
        ))}
      </div>
      <Skeleton className="h-6 w-36" />
      <div className="space-y-3">
        {skeletonKeys(5).map((key) => (
          <Skeleton key={key} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}
