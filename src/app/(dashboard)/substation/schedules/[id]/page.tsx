import type { Metadata } from "next";
import { Suspense } from "react";
import ScheduleBatchDetail from "@/components/modules/substation/schedule-batch-detail";

export const metadata: Metadata = {
  title: "Schedule Batch",
  description: "Details of a load-shedding schedule batch.",
};

export default async function ScheduleBatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense>
      <ScheduleBatchDetail scheduleBatchId={id} />
    </Suspense>
  );
}
