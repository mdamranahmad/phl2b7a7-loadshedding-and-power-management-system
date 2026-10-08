import { Skeleton } from "@/components/ui/skeleton";

export default function AllocateLoading() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <Skeleton className="h-9 w-48" />
      <div className="space-y-4 rounded-2xl border p-6">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-36" />
      </div>
    </div>
  );
}
