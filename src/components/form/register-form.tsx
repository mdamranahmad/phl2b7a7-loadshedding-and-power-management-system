"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useUserRegistration } from "@/hooks/auth.hook";
import { getApiErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { registerZschema } from "@/validation";
import { Spinner } from "../ui/spinner";

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            // onSubmit: registerSchema,
            onSubmit: registerZschema,
        },
        onSubmit: async ({ value }) => {
            try {
                await registerMutation.mutateAsync(
                    {
                        name: value.name,
                        email: value.email,
                        password: value.password,
                        customerProfile: { meterNumber: value.meterNumber },
                    },
                    {
                        onSuccess: (res) => {
                            toast.add({
                                title: "Registration Successful",
                                description: res.message,
                                type: "success",
                            });
                            router.push(
                                `/register/verify?email=${encodeURIComponent(value.email)}`,
                            );
                        },
                    },
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
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                        return (
                            <Field>
                                <FieldLabel htmlFor={field.name}>
                                    Full name
                                </FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) =>
                                        field.handleChange(event.target.value)
                                    }
                                    placeholder="Jane Doe"
                                    autoComplete="name"
                                />
                                {isInvalid && (
                                    <FieldError
                                        errors={field.state.meta.errors}
                                    />
                                )}
                                {/* {field.state.meta.errors.length > 0 && (
                                    <FieldDescription className="text-destructive">
                                        {field.state.meta.errors[0]?.message}
                                    </FieldDescription>
                                )} */}
                            </Field>
                        );
                    }}
                </form.Field>

                <div className="grid gap-6 sm:grid-cols-2">
                    <form.Field name="email">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="email"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                    />
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                    {/* {field.state.meta.errors.length > 0 && (
                                        <FieldDescription className="text-destructive">
                                            {
                                                field.state.meta.errors[0]
                                                    ?.message
                                            }
                                        </FieldDescription>
                                    )} */}
                                </Field>
                            );
                        }}
                    </form.Field>

                    <form.Field name="meterNumber">
                        {(field) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>
                                    Meter number
                                </FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) =>
                                        field.handleChange(event.target.value)
                                    }
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
                                <FieldLabel htmlFor={field.name}>
                                    Password
                                </FieldLabel>
                                <div className="relative">
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        type="button"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeClosed className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
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
                                <FieldLabel htmlFor={field.name}>
                                    Confirm password
                                </FieldLabel>
                                <div className="relative">
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        type="button"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev,
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeClosed className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
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
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Spinner>Creating account...</Spinner>
                        ) : (
                            "Create account"
                        )}
                    </Button>
                )}
            </form.Subscribe>

            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                    Sign in
                </Link>
            </div>

            {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or try the demo
                    </span>
                </div>
            </div>

            <DemoLogin /> */}
        </form>
    );
}
