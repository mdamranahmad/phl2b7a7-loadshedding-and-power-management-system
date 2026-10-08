import type { Metadata } from "next";
import ReportOutageForm from "@/components/form/report-outage-form";
import PageHeader from "@/components/modules/common/page-header";

export const metadata: Metadata = {
  title: "Report Outage",
  description: "Submit a new power outage report for your area.",
};

export default function ReportOutagePage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <PageHeader
        title="Report an Outage"
        description="Tell us what's happening — your report goes straight to the zonal manager for review."
      />
      <ReportOutageForm />
    </div>
  );
}
