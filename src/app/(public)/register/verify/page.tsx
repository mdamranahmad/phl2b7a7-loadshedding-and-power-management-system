import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailForm } from "@/components/form/verify-email-form";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Enter the verification code to activate your account.",
};

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailForm />
    </Suspense>
  );
}
