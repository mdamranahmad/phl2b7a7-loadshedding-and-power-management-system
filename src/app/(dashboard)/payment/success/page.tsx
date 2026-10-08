import { CheckCircle2, Coins } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Payment Successful",
  robots: { index: false },
};

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <div className="rounded-full bg-emerald-500/10 p-5 text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="size-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Payment successful!
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Your bKash payment was confirmed. The purchased token has been added
          to your account — copy it from your token history and load it onto
          your meter.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          render={
            <Link href="/dashboard/my-tokens">
              <Coins className="size-4" />
              View my tokens
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
