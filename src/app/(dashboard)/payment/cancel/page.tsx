import { RefreshCw, XCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Payment Not Completed",
  robots: { index: false },
};

const REASONS: Record<string, string> = {
  cancel: "You cancelled the bKash checkout before completing it.",
  failure: "bKash reported the transaction as failed.",
  "payment-failed":
    "We could not confirm your payment. You were not charged for an issued token.",
};

interface IPaymentCancelPageProps {
  searchParams: Promise<{ reason?: string }>;
}

export default async function PaymentCancelPage({
  searchParams,
}: IPaymentCancelPageProps) {
  const { reason } = await searchParams;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-5 text-destructive">
        <XCircle className="size-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Payment not completed
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {REASONS[reason ?? ""] ??
            "The payment did not go through. No token was issued."}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          render={
            <Link href="/dashboard/my-tokens">
              <RefreshCw className="size-4" />
              Try again
            </Link>
          }
        />
        <Button
          variant="outline"
          render={<Link href="/customer">Back to dashboard</Link>}
        />
      </div>
    </div>
  );
}
