"use client";

import { Check, FileText, MailCheck, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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
import {
  useApplyAsTechnician,
  useVerifyTechnicianEmail,
} from "@/hooks/technician.hook";
import { getApiErrorMessage } from "@/lib/error";
import {
  technicianApplyAccountZSchema,
  technicianApplyDetailsZSchema,
} from "@/validation";

const STEPS = ["Account", "Professional details", "Review & submit"] as const;

type TStepErrors = Partial<Record<string, string>>;

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export function TechnicianApplyForm() {
  const router = useRouter();
  const applyMutation = useApplyAsTechnician();
  const verifyMutation = useVerifyTechnicianEmail();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<TStepErrors>({});

  // Step 1 — account
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Step 2 — details
  const [address, setAddress] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experienceYear, setExperienceYear] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  // Post-submit email verification
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const validateStep = (): boolean => {
    if (step === 0) {
      const parsed = technicianApplyAccountZSchema.safeParse({
        name,
        email,
        password,
      });
      if (parsed.success) {
        setErrors({});
        return true;
      }
      const next: TStepErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return false;
    }
    if (step === 1) {
      const parsed = technicianApplyDetailsZSchema.safeParse({
        address,
        expertise,
        experienceYear,
      });
      const next: TStepErrors = {};
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const key = String(issue.path[0] ?? "");
          if (key && !next[key]) next[key] = issue.message;
        }
      }
      if (!resume) {
        next.resume = "Please attach your resume";
      } else if (resume.size > MAX_RESUME_BYTES) {
        next.resume = "Resume must be smaller than 5 MB";
      }
      setErrors(next);
      return Object.keys(next).length === 0;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep() || !resume) return;
    try {
      await applyMutation.mutateAsync({
        payload: {
          name,
          email,
          password,
          role: "TECHNICIAN",
          address,
          expertise,
          experienceYear: Number(experienceYear),
        },
        resume,
      });
      setSubmitted(true);
      toast.add({
        title: "Application submitted",
        description: "An email verification code has been sent to your inbox.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Application failed",
        description: getApiErrorMessage(error),
        type: "error",
      });
    }
  };

  const handleVerify = async () => {
    const code = otp.trim();
    if (!/^\d{6}$/.test(code)) {
      setOtpError("Enter the 6-digit code sent to your email");
      return;
    }
    setOtpError("");
    try {
      await verifyMutation.mutateAsync({ email: email.trim(), otp: code });
      setVerified(true);
      toast.add({
        title: "Email verified",
        description:
          "Your email is verified. A manager will review your application shortly.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Verification failed",
        description: getApiErrorMessage(error),
        type: "error",
      });
    }
  };

  if (submitted && verified) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="size-6" />
          </div>
          <CardTitle>Email verified</CardTitle>
          <CardDescription>
            Your technician application is pending review. You&apos;ll receive
            an email once a manager verifies your profile, then you can sign in.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button onClick={() => router.push("/login")}>Go to sign in</Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to home
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (submitted) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="size-6" />
          </div>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Application received. We emailed a 6-digit code to{" "}
            <span className="font-medium text-foreground">{email}</span>. Enter
            it below to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="tech-otp">Verification code</FieldLabel>
            <Input
              id="tech-otp"
              inputMode="numeric"
              maxLength={6}
              className="text-center text-lg tracking-[0.5em]"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ""));
                setOtpError("");
              }}
              placeholder="000000"
              autoComplete="one-time-code"
              autoFocus
            />
            {otpError && (
              <FieldDescription className="text-destructive">
                {otpError}
              </FieldDescription>
            )}
          </Field>
          <Button
            type="button"
            onClick={() => void handleVerify()}
            disabled={verifyMutation.isPending || otp.length !== 6}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify email"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            The code expires in 5 minutes. Didn&apos;t get it? Apply again with
            the same email to receive a fresh code.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <ol className="flex items-center gap-2">
        {STEPS.map((label, index) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`flex size-8 items-center justify-center rounded-full border text-sm font-medium ${
                index < step
                  ? "border-primary bg-primary text-primary-foreground"
                  : index === step
                    ? "border-primary text-primary"
                    : "border-muted-foreground/30 text-muted-foreground"
              }`}
            >
              {index < step ? <Check className="size-4" /> : index + 1}
            </div>
            <span
              className={`text-center text-xs ${
                index <= step ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <Card>
        <CardHeader>
          <CardTitle>{STEPS[step]}</CardTitle>
          <CardDescription>
            {step === 0 &&
              "Step 1 of 3 — basic account credentials for your technician profile."}
            {step === 1 &&
              "Step 2 of 3 — your professional background and resume."}
            {step === 2 && "Step 3 of 3 — review everything before submitting."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 0 && (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="tech-name">Full name</FieldLabel>
                <Input
                  id="tech-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                  placeholder="Jane Doe"
                  autoComplete="name"
                />
                {errors.name && (
                  <FieldDescription className="text-destructive">
                    {errors.name}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="tech-email">Email</FieldLabel>
                <Input
                  id="tech-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <FieldDescription className="text-destructive">
                    {errors.email}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="tech-password">Password</FieldLabel>
                <Input
                  id="tech-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError("password");
                  }}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {errors.password ? (
                  <FieldDescription className="text-destructive">
                    {errors.password}
                  </FieldDescription>
                ) : (
                  <FieldDescription>
                    Min 8 characters with an uppercase letter and a number.
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          )}

          {step === 1 && (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="tech-address">Address</FieldLabel>
                <Input
                  id="tech-address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    clearError("address");
                  }}
                  placeholder="House 12, Road 5, Dhanmondi"
                />
                {errors.address && (
                  <FieldDescription className="text-destructive">
                    {errors.address}
                  </FieldDescription>
                )}
              </Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="tech-expertise">Expertise</FieldLabel>
                  <Input
                    id="tech-expertise"
                    value={expertise}
                    onChange={(e) => {
                      setExpertise(e.target.value);
                      clearError("expertise");
                    }}
                    placeholder="e.g. Line maintenance"
                  />
                  {errors.expertise && (
                    <FieldDescription className="text-destructive">
                      {errors.expertise}
                    </FieldDescription>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="tech-experience">
                    Experience (years)
                  </FieldLabel>
                  <Input
                    id="tech-experience"
                    type="number"
                    min={0}
                    value={experienceYear}
                    onChange={(e) => {
                      setExperienceYear(e.target.value);
                      clearError("experienceYear");
                    }}
                    placeholder="5"
                  />
                  {errors.experienceYear && (
                    <FieldDescription className="text-destructive">
                      {errors.experienceYear}
                    </FieldDescription>
                  )}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="tech-resume">Resume</FieldLabel>
                <input
                  ref={fileInputRef}
                  id="tech-resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setResume(file);
                    clearError("resume");
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex w-full flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-muted/50 ${
                    errors.resume ? "border-destructive" : "border-border"
                  }`}
                >
                  {resume ? (
                    <>
                      <FileText className="size-6 text-primary" />
                      <span className="text-sm font-medium">{resume.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Click to replace
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="size-6 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Upload your resume
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PDF or Word document, up to 5 MB
                      </span>
                    </>
                  )}
                </button>
                {errors.resume && (
                  <FieldDescription className="text-destructive">
                    {errors.resume}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          )}

          {step === 2 && (
            <dl className="divide-y divide-border rounded-lg border">
              {[
                ["Full name", name],
                ["Email", email],
                ["Address", address],
                ["Expertise", expertise],
                ["Experience", `${experienceYear} year(s)`],
                ["Resume", resume?.name ?? "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 0}
            >
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={applyMutation.isPending}
              >
                {applyMutation.isPending
                  ? "Submitting..."
                  : "Submit application"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
