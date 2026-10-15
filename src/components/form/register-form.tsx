"use client";
import { useForm } from "@tanstack/react-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { CustomerRegistrationZSchema } from "@/validation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useUserRegister } from "@/hooks";
import { IApiError, IUserRegisterPayload } from "@/types";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import Link from "next/link";

const RegistrationForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { mutate: register, isPending: isRegisterPending } =
        useUserRegister();
    const form = useForm({
        defaultValues: {
            name: "Ordinary Man",
            email: "ordinaryman@email.com",
            password: "123456Aa",
            confirmPassword: "123456Aa",
            meterNumber: "234567891234",
        },
        validators: { onSubmit: CustomerRegistrationZSchema },
        onSubmit: async ({ value }) => {
            const registerData: IUserRegisterPayload = {
                name: value.name,
                email: value.email,
                password: value.password,
                customerProfile: { meterNumber: value.meterNumber },
            };

            register(registerData, {
                onSuccess: (res) => {
                    if (!res.success) {
                        toast.add({
                            title: "Server Failure",
                            description:
                                res.message ||
                                "Something went wrong! Please try again.",
                            type: "error",
                        });
                    }

                    toast.add({
                        title: "Registration Initiated",
                        description: res.message || "Please Verify Email",
                        type: "success",
                    });
                    const params = new URLSearchParams({
                        email: registerData.email,
                        source: "register",
                        step: "verify",
                    });
                    router.push(
                        `/registration/verify-email?${params.toString()}`,
                    );
                    // router.push(
                    //     `/register/verify-email?${value.email.toString()}`,
                    // );
                },
                onError: (err: IApiError) => {
                    toast.add({
                        title: "Registration Failure",
                        description:
                            err.data?.message ||
                            "Something went wrong! Please try again.",
                        type: "error",
                    });
                },
            });
        },
    });

    return (
        <div className="w-full max-w-xs flex flex-col gap-5">
            <div className="text-center flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                    Create An Account
                </h1>
                <p className="text-muted-foreground">
                    Enter your details to join
                </p>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
                    <form.Field name="name">
                        {(field) => {
                            const isInValid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInValid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Full Name
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="text"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        placeholder="Jane Doe"
                                        autoComplete="name"
                                    />
                                    {isInValid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <form.Field name="email">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="email"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        placeholder="email@example.com"
                                        autoComplete="email"
                                    />
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <form.Field name="meterNumber">
                        {(field) => {
                            const isInValid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <FieldGroup data-invalid={isInValid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Meter Number{" "}
                                        <span className="text-xs text-muted-foreground">
                                            (Optional)
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        onBlur={field.handleBlur}
                                        placeholder="123-456-789-012"
                                    />
                                    {isInValid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </FieldGroup>
                            );
                        }}
                    </form.Field>
                    <form.Field name="password">
                        {(field) => {
                            const isInValid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <FieldGroup data-invalid={isInValid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Password
                                    </FieldLabel>
                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            onBlur={field.handleBlur}
                                            placeholder="********"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 "
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
                                    {isInValid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </FieldGroup>
                            );
                        }}
                    </form.Field>
                    <form.Field name="confirmPassword">
                        {(field) => {
                            const isInValid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <FieldGroup data-invalid={isInValid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Confirm Password
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
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            onBlur={field.handleBlur}
                                            placeholder="********"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    (prev) => !prev,
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 "
                                        >
                                            {showConfirmPassword ? (
                                                <EyeClosed className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                    {isInValid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </FieldGroup>
                            );
                        }}
                    </form.Field>
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isRegisterPending}
                    >
                        {isRegisterPending ? (
                            <Spinner>Submitting...</Spinner>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </FieldGroup>
            </form>
            <FieldSeparator>Or Continue With</FieldSeparator>
            {/*Google login component will go here */}
            <div className="text-center text-sm text-muted-foreground">
                Already have and account?{" "}
                <Link
                    href="/login"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegistrationForm;
