"use client";

import { Button } from "../ui/button";
import { useForm } from "@tanstack/react-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    // const form = useForm({
    //     defaultValues: {
    //         email: "",
    //         password: "",
    //     },
    //     onSubmit: (data) => {
    //         console.log("data", data);
    //     },
    // });
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Login to your account{" "}
                </h1>
                <p className="text-muted-foreground">
                    Enter your credentials below to login to your account
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
                    <form.Field name="email">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="field.name">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        autoComplete="off"
                                        aria-invalid={isInvalid}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
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
                    <form.Field name="password">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="field.name">
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
                                            onBlur={field.handleBlur}
                                            autoComplete="off"
                                            aria-invalid={isInvalid}
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value,
                                                );
                                            }}
                                        />
                                        <button
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            type="button"
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
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <Button type="submit" size="lg">
                        Submit
                    </Button>
                </FieldGroup>
            </form>
            <FieldSeparator>OR</FieldSeparator>
            {/* Google Login Component Will Go Here */}
            {/* Demo Login Component Will Go Here */}
        </div>
    );
}
