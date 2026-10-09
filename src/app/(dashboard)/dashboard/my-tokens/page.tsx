import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import PageHeader from "@/components/modules/common/page-header";
import {
  BuyTokenCard,
  RechargeTokenCard,
} from "@/components/modules/token/token-cards";
import { TokenList } from "@/components/modules/token/token-list";

export const metadata: Metadata = {
  title: "My Tokens",
  description:
    "Buy prepaid electricity tokens with bKash, recharge by token number, and track payment status.",
};

interface IMyTokensPageProps {
  searchParams: Promise<{
    status?: string;
    error?: string;
  }>;
}

/**
 * Also the bKash return target: the backend 302s back here with
 * `?status=success|failure|cancel` or `?error=payment-failed`, which we hand
 * off to the dedicated result pages.
 */
export default async function MyTokensPage({
  searchParams,
}: IMyTokensPageProps) {
  const { status, error } = await searchParams;

  if (error === "payment-failed") {
    redirect("/payment/cancel?reason=payment-failed");
  }
  if (status === "success") {
    redirect("/payment/success");
  }
  if (status === "failure") {
    redirect("/payment/cancel?reason=failure");
  }
  if (status === "cancel") {
    redirect("/payment/cancel?reason=cancel");
  }

  return (
    <div className="space-y-6 m-10">
      <PageHeader
        title="My Tokens"
        description="Buy prepaid tokens via bKash or recharge an existing token number."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <BuyTokenCard />
        <RechargeTokenCard />
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Token history</h2>
        <Suspense fallback={<TokenListSkeleton />}>
          <TokenList />
        </Suspense>
      </div>
    </div>
  );
}

function TokenListSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="h-9 w-full max-w-xs animate-pulse rounded-xl bg-muted" />
        <div className="h-9 w-36 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="h-72 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}
