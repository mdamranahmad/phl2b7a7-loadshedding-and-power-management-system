import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Skeleton className="h-9 w-56" />
      <div className="space-y-4 rounded-2xl border p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="size-14 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        {skeletonKeys(5).map((key) => (
          <div key={key} className="flex items-center gap-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
