import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";

export default function TechnicianApplicationsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-72" />
      <Skeleton className="h-9 w-full max-w-xs" />
      <div className="space-y-3 rounded-2xl border p-4">
        {skeletonKeys(4).map((key) => (
          <Skeleton key={key} className="h-14 w-full" />
        ))}
      </div>
    </div>
  );
}
