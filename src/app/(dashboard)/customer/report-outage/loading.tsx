import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportOutageLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Skeleton className="h-9 w-64" />
      <div className="space-y-4 rounded-2xl border p-6">
        {skeletonKeys(5).map((key) => (
          <div key={key} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
        <Skeleton className="h-9 w-40" />
      </div>
    </div>
  );
}
