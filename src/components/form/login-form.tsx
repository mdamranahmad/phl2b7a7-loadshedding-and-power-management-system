"use client";

import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { userGetMe } from "@/api";
import DemoLoginButtons from "@/components/modules/auth/demo-login";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useUserLogin } from "@/hooks";
import { getDashboardPath } from "@/lib/dashboard-path";
import { getApiErrorMessage } from "@/lib/error";
import { loginZschema } from "@/validation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoginPending } = useUserLogin();

  const handleLoginSuccess = async () => {
    // Drop any cached (possibly stale) session before fetching the fresh one.
    queryClient.removeQueries({ queryKey: ["user"] });
    try {
      const me = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: userGetMe,
        staleTime: 0,
      });
      const role = me.data.role;
      toast.add({
        title: "Login Successful",
        description: `Welcome back, ${me.data.name}`,
        type: "success",
      });
      window.location.href = role ? getDashboardPath(role) : "/";
    } catch {
      window.location.href = "/";
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: loginZschema },
    onSubmit: ({ value }) => {
      login(value, {
        onSuccess: handleLoginSuccess,
        onError: (error) => {
          toast.add({
            title: "Login Failed",
            description: getApiErrorMessage(error),
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome Back 👋</h1>
        <p className="text-muted-foreground">
          Login to your account to manage power & outages
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={isInvalid}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      aria-invalid={isInvalid}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <Button disabled={isLoginPending} type="submit" size="lg">
            {isLoginPending ? <Spinner>Logging in...</Spinner> : "🔐 Login"}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>OR</FieldSeparator>

      <DemoLoginButtons />

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary underline underline-offset-4"
        >
          Register
        </Link>
      </p>
      <p className="text-center text-sm text-muted-foreground">
        Want to join our field team?{" "}
        <Link
          href="/apply-as-technician"
          className="font-medium text-primary underline underline-offset-4"
        >
          Apply as a Technician
        </Link>
      </p>
    </div>
  );
}
