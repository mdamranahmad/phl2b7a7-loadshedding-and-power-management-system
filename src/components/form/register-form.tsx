"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import DemoLogin from "@/components/modules/auth/demo-login";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useUserRegistration } from "@/hooks/auth.hook";
import { getApiErrorMessage } from "@/lib/error";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: z.string().email("Enter a valid email"),
    meterNumber: z.string().min(3, "Meter number is required"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useUserRegistration();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      meterNumber: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await registerMutation.mutateAsync({
          name: value.name,
          email: value.email,
          password: value.password,
          customerProfile: { meterNumber: value.meterNumber },
        });
        router.push(
          `/register/verify?email=${encodeURIComponent(value.email)}`,
        );
      } catch (error) {
        toast.add({
          title: "Registration failed",
          description: getApiErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-6"
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Jane Doe"
                autoComplete="name"
              />
              {field.state.meta.errors.length > 0 && (
                <FieldDescription className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </FieldDescription>
              )}
            </Field>
          )}
        </form.Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <form.Field name="email">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldDescription className="text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          </form.Field>

          <form.Field name="meterNumber">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Meter number</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="123 456 789 02"
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldDescription className="text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          </form.Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldDescription className="text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldDescription className="text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          </form.Field>
        </div>
      </FieldGroup>

      <form.Subscribe selector={(state) => [state.isSubmitting]}>
        {([isSubmitting]) => (
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        )}
      </form.Subscribe>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or try the demo
          </span>
        </div>
      </div>

      <DemoLogin />
    </form>
  );
}
