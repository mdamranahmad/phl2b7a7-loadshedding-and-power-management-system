"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useUserVerifyEmail } from "@/hooks/auth.hook";
import { getApiErrorMessage } from "@/lib/error";

const verifySchema = z.object({
  otp: z
    .string()
    .min(6, "Enter the 6-digit code")
    .max(6, "Enter the 6-digit code")
    .regex(/^[0-9]+$/, "Digits only"),
});

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const verifyMutation = useUserVerifyEmail();

  const form = useForm({
    defaultValues: { otp: "" },
    validators: { onSubmit: verifySchema },
    onSubmit: async ({ value }) => {
      try {
        await verifyMutation.mutateAsync({ email, otp: value.otp });
        toast.add({
          title: "Account verified",
          description: "You can now sign in with your credentials.",
          type: "success",
        });
        router.push("/login?verified=1");
      } catch (error) {
        toast.add({
          title: "Verification failed",
          description: getApiErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  useEffect(() => {
    if (!email) {
      router.replace("/register");
    }
  }, [email, router]);

  if (!email) {
    return null;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Verify email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to <span className="font-medium">{email}</span>
          . Enter it below to activate your account.
        </p>
      </div>

      <FieldGroup>
        <form.Field name="otp">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Verification code</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                inputMode="numeric"
                maxLength={6}
                className="text-center text-lg tracking-[0.5em]"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="000000"
                autoComplete="one-time-code"
                autoFocus
              />
              {field.state.meta.errors.length > 0 && (
                <FieldDescription className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </FieldDescription>
              )}
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <form.Subscribe selector={(state) => [state.isSubmitting]}>
        {([isSubmitting]) => (
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify account"}
          </Button>
        )}
      </form.Subscribe>

      <div className="space-y-2 text-center text-sm text-muted-foreground">
        <p>
          Didn&apos;t get the code? Register again with the same email to get a
          fresh code.
        </p>
        <p>
          <Link href="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
