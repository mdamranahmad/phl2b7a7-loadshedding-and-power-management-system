import type { Metadata } from "next";
import { Suspense } from "react";
import AssignmentList from "@/components/modules/technician/assignment-list";

export const metadata: Metadata = {
  title: "My Assignments",
  description: "Outage tickets assigned to you.",
};

export default function AssignmentsPage() {
  return (
    <Suspense>
      <AssignmentList />
    </Suspense>
  );
}
