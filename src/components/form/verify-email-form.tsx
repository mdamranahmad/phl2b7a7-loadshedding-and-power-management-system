"use client";
import { RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const VerifyEmailForm = () => {
    const [otp, setOtp] = useState("");
    return (
        <Card>
            <CardHeader>
                <CardTitle>Verify Email</CardTitle>
                <CardDescription>
                    Please provide the otp sent to your email
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="otp-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        /* Logic for handle otp */
                    }}
                >
                    <Field>
                        <FieldLabel htmlFor="otp">Verification Code</FieldLabel>
                        <InputOTP
                            id="otp"
                            name="otp"
                            autoComplete="off"
                            maxLength={6}
                            onChange={(value) => {
                                setOtp(value);
                            }}
                            pattern={REGEXP_ONLY_DIGITS}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </Field>
                </form>
            </CardContent>
            <CardFooter>
                <Button variant="outline">Resend</Button>
                <Button type="submit" form="otp-form">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
};

export default VerifyEmailForm;

{
    /**<Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">m@example.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <Button variant="outline" size="xs">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
          <InputOTP maxLength={6} id="otp-verification" required>
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>
            <a href="#">I no longer have access to this email address.</a>
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" className="w-full">
            Verify
          </Button>
          <div className="text-sm text-muted-foreground">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card> */
}
