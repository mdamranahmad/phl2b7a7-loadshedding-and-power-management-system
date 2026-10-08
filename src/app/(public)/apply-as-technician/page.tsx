import type { Metadata } from "next";
import { TechnicianApplyForm } from "@/components/form/technician-apply-form";

export const metadata: Metadata = {
  title: "Apply as Technician",
  description:
    "Join the Load Shedding & Power Management System maintenance team — submit your resume and professional details in 3 easy steps.",
};

export default function ApplyAsTechnicianPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Apply as a Technician
        </h1>
        <p className="text-muted-foreground">
          Fill in your account details, professional background, and attach your
          resume. Our managers review every application.
        </p>
      </div>
      <TechnicianApplyForm />
    </div>
  );
}
