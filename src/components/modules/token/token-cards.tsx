"use client";

import { useForm } from "@tanstack/react-form";
import { Coins, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { usePayUnpaidToken, useRechargeToken, useRequestToken } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";
import { rechargeTokenZschema, requestTokenZschema } from "@/validation";

/** Step 1 of the bKash flow: pick an amount → hosted checkout. */
export function BuyTokenCard() {
  const requestToken = useRequestToken();
  const [redirecting, setRedirecting] = useState(false);

  const form = useForm({
    defaultValues: { rechargeAmount: "" },
    validators: { onSubmit: requestTokenZschema },
    onSubmit: async ({ value }) => {
      try {
        const response = await requestToken.mutateAsync({
          rechargeAmount: Number(value.rechargeAmount),
        });
        const paymentUrl = response.data.paymentUrl;
        setRedirecting(true);
        toast.add({
          title: "Redirecting to bKash",
          description: "Complete the payment to receive your token.",
          type: "success",
        });
        window.location.href = paymentUrl;
      } catch (error) {
        setRedirecting(false);
        toast.add({
          title: "Could not start payment",
          description: getApiErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="size-4 text-primary" />
          Buy a token
        </CardTitle>
        <CardDescription>
          Pay with bKash — your token is issued after a successful payment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="rechargeAmount">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Recharge amount (৳)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    min={1}
                    step="any"
                    inputMode="decimal"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="500"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </form.Field>
            <form.Subscribe selector={(state) => [state.isSubmitting]}>
              {([isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || requestToken.isPending || redirecting
                  }
                >
                  {redirecting || requestToken.isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <CreditCard className="size-4" />
                      Pay with bKash
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

/** Re-activates an existing token number (e.g. bought earlier). */
export function RechargeTokenCard() {
  const recharge = useRechargeToken();

  const form = useForm({
    defaultValues: { TokenNo: "" },
    validators: { onSubmit: rechargeTokenZschema },
    onSubmit: async ({ value }) => {
      try {
        await recharge.mutateAsync({ TokenNo: value.TokenNo });
        toast.add({
          title: "Token recharged",
          description: `${value.TokenNo} was added to your meter.`,
          type: "success",
        });
        form.reset();
      } catch (error) {
        toast.add({
          title: "Recharge failed",
          description: getApiErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="size-4 text-primary" />
          Recharge with token number
        </CardTitle>
        <CardDescription>
          Already own a token number? Enter it to load it onto your meter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="TokenNo">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Token number</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="8631-9280-8539-0600-1060"
                    className="font-mono"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </form.Field>
            <form.Subscribe selector={(state) => [state.isSubmitting]}>
              {([isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={isSubmitting || recharge.isPending}
                >
                  {recharge.isPending ? "Recharging..." : "Recharge token"}
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

/** Pays an existing UNPAID token → new bKash hosted checkout. */
export function PayUnpaidButton({ tokenId }: { tokenId: string }) {
  const payUnpaid = usePayUnpaidToken();

  const handleClick = async () => {
    try {
      const response = await payUnpaid.mutateAsync(tokenId);
      toast.add({
        title: "Redirecting to bKash",
        description: "Complete the payment to activate this token.",
        type: "success",
      });
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      toast.add({
        title: "Could not start payment",
        description: getApiErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <Button
      size="sm"
      onClick={() => void handleClick()}
      disabled={payUnpaid.isPending}
    >
      {payUnpaid.isPending ? "Processing..." : "Pay now"}
    </Button>
  );
}
