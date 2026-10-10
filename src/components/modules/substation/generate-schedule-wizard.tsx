"use client";

import { Check, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { useGenerateSchedule } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";
import { scheduleAllocationZSchema, scheduleTimingZSchema } from "@/validation";

const STEPS = ["Power allocation", "Timing", "Review & generate"] as const;

type TErrors = Partial<Record<string, string>>;

const HOUR_OPTIONS = [
    { value: 3600, label: "1 hour" },
    { value: 7200, label: "2 hours" },
    { value: 10800, label: "3 hours" },
    { value: 14400, label: "4 hours" },
];

const SLOT_OPTIONS = [
    { value: 900, label: "15 minutes" },
    { value: 1800, label: "30 minutes" },
    { value: 3600, label: "1 hour" },
];

const GenerateScheduleWizard = () => {
    const router = useRouter();
    const generateSchedule = useGenerateSchedule();

    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState<TErrors>({});

    // Step 1 — allocation
    const [capacityKw, setCapacityKw] = useState("");
    const [allocatedKw, setAllocatedKw] = useState("");
    // Step 2 — timing
    const [scheduleDuration, setScheduleDuration] = useState("7200");
    const [outageSlotDuration, setOutageSlotDuration] = useState("1800");
    const [batchStartTime, setBatchStartTime] = useState("");
    const [batchEndTime, setBatchEndTime] = useState("");
    // Final
    const [done, setDone] = useState(false);

    const clearError = (key: string) =>
        setErrors((prev) => {
            if (!(key in prev)) return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });

    const collectIssues = (
        result: {
            success: boolean;
            error?: { issues: { path: PropertyKey[]; message: string }[] };
        },
        target: TErrors,
    ) => {
        if (result.success || !result.error) return;
        for (const issue of result.error.issues) {
            const key = String(issue.path[0] ?? "");
            if (key && !target[key]) target[key] = issue.message;
        }
    };

    const validateStep = (): boolean => {
        const next: TErrors = {};
        if (step === 0) {
            collectIssues(
                scheduleAllocationZSchema.safeParse({
                    capacityKw,
                    allocatedKw,
                }),
                next,
            );
        } else if (step === 1) {
            collectIssues(
                scheduleTimingZSchema.safeParse({
                    // scheduleDuration: Number(scheduleDuration),
                    // outageSlotDuration: Number(outageSlotDuration),
                    scheduleDuration,
                    outageSlotDuration,
                    batchStartTime,
                    batchEndTime,
                }),
                next,
            );
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
    };

    const handleBack = () => {
        setErrors({});
        setStep((s) => Math.max(s - 1, 0));
    };

    const handleSubmit = async () => {
        try {
            await generateSchedule.mutateAsync({
                capacityKw: Number(capacityKw),
                allocatedKw: Number(allocatedKw),
                scheduleDuration: Number(scheduleDuration),
                outageSlotDuration: Number(outageSlotDuration),
                batchStartTime: new Date(batchStartTime).toISOString(),
                batchEndTime: new Date(batchEndTime).toISOString(),
            });
            setDone(true);
            toast.add({
                title: "Schedule generated",
                description:
                    "Your new batch is in DRAFT — publish it when you're ready.",
                type: "success",
            });
        } catch (error) {
            toast.add({
                title: "Could not generate schedule",
                description: getApiErrorMessage(error),
                type: "error",
            });
        }
    };

    if (done) {
        return (
            <Card className="m-10">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-6" />
                    </div>
                    <CardTitle>Schedule generated</CardTitle>
                    <CardDescription>
                        The batch was created as a draft. Publish it from the
                        batches list to make it visible to customers.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Button
                        onClick={() => router.push("/substation/schedules")}
                    >
                        Go to schedule batches
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setDone(false);
                            setStep(0);
                        }}
                    >
                        Generate another
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6 m-10">
            <ol className="flex items-center gap-2">
                {STEPS.map((label, index) => (
                    <li
                        key={label}
                        className="flex flex-1 flex-col items-center gap-2"
                    >
                        <div
                            className={`flex size-8 items-center justify-center rounded-full border text-sm font-medium ${
                                index < step
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : index === step
                                      ? "border-primary text-primary"
                                      : "border-muted-foreground/30 text-muted-foreground"
                            }`}
                        >
                            {index < step ? (
                                <Check className="size-4" />
                            ) : (
                                index + 1
                            )}
                        </div>
                        <span
                            className={`text-center text-xs ${
                                index <= step
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            }`}
                        >
                            {label}
                        </span>
                    </li>
                ))}
            </ol>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="size-4 text-primary" />
                        {STEPS[step]}
                    </CardTitle>
                    <CardDescription>
                        {step === 0 &&
                            "Step 1 of 3 — set the substation capacity and how much load to allocate."}
                        {step === 1 &&
                            "Step 2 of 3 — choose the schedule cycle, outage slot length and the batch window."}
                        {step === 2 &&
                            "Step 3 of 3 — review everything before generating the batch."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 0 && (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="capacityKw">
                                    Substation capacity (kW)
                                </FieldLabel>
                                <Input
                                    id="capacityKw"
                                    type="number"
                                    min={0}
                                    step="any"
                                    value={capacityKw}
                                    onChange={(e) => {
                                        setCapacityKw(e.target.value);
                                        clearError("capacityKw");
                                    }}
                                    placeholder="500"
                                />
                                {errors.capacityKw && (
                                    <FieldDescription className="text-destructive">
                                        {errors.capacityKw}
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="allocatedKw">
                                    Allocated load (kW)
                                </FieldLabel>
                                <Input
                                    id="allocatedKw"
                                    type="number"
                                    min={0}
                                    step="any"
                                    value={allocatedKw}
                                    onChange={(e) => {
                                        setAllocatedKw(e.target.value);
                                        clearError("allocatedKw");
                                    }}
                                    placeholder="350"
                                />
                                {errors.allocatedKw ? (
                                    <FieldDescription className="text-destructive">
                                        {errors.allocatedKw}
                                    </FieldDescription>
                                ) : (
                                    <FieldDescription>
                                        Must be equal to or less than the
                                        substation capacity.
                                    </FieldDescription>
                                )}
                            </Field>
                        </FieldGroup>
                    )}

                    {step === 1 && (
                        <FieldGroup>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="scheduleDuration">
                                        Schedule duration
                                    </FieldLabel>
                                    <select
                                        id="scheduleDuration"
                                        value={scheduleDuration}
                                        onChange={(e) => {
                                            setScheduleDuration(e.target.value);
                                            clearError("scheduleDuration");
                                        }}
                                        className="flex h-9 w-full rounded-4xl border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    >
                                        {HOUR_OPTIONS.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.scheduleDuration && (
                                        <FieldDescription className="text-destructive">
                                            {errors.scheduleDuration}
                                        </FieldDescription>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="outageSlotDuration">
                                        Outage slot length
                                    </FieldLabel>
                                    <select
                                        id="outageSlotDuration"
                                        value={outageSlotDuration}
                                        onChange={(e) => {
                                            setOutageSlotDuration(
                                                e.target.value,
                                            );
                                            clearError("outageSlotDuration");
                                        }}
                                        className="flex h-9 w-full rounded-4xl border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    >
                                        {SLOT_OPTIONS.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.outageSlotDuration && (
                                        <FieldDescription className="text-destructive">
                                            {errors.outageSlotDuration}
                                        </FieldDescription>
                                    )}
                                </Field>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="batchStartTime">
                                        Batch starts
                                    </FieldLabel>
                                    <Input
                                        id="batchStartTime"
                                        type="datetime-local"
                                        value={batchStartTime}
                                        onChange={(e) => {
                                            setBatchStartTime(e.target.value);
                                            clearError("batchStartTime");
                                        }}
                                    />
                                    {errors.batchStartTime && (
                                        <FieldDescription className="text-destructive">
                                            {errors.batchStartTime}
                                        </FieldDescription>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="batchEndTime">
                                        Batch ends
                                    </FieldLabel>
                                    <Input
                                        id="batchEndTime"
                                        type="datetime-local"
                                        value={batchEndTime}
                                        onChange={(e) => {
                                            setBatchEndTime(e.target.value);
                                            clearError("batchEndTime");
                                        }}
                                    />
                                    {errors.batchEndTime && (
                                        <FieldDescription className="text-destructive">
                                            {errors.batchEndTime}
                                        </FieldDescription>
                                    )}
                                </Field>
                            </div>
                        </FieldGroup>
                    )}

                    {step === 2 && (
                        <dl className="divide-y divide-border rounded-lg border">
                            {[
                                ["Capacity", `${capacityKw} kW`],
                                ["Allocated load", `${allocatedKw} kW`],
                                [
                                    "Schedule duration",
                                    `${
                                        HOUR_OPTIONS.find(
                                            (o) =>
                                                String(o.value) ===
                                                scheduleDuration,
                                        )?.label ?? `${scheduleDuration}s`
                                    }`,
                                ],
                                [
                                    "Outage slot",
                                    `${
                                        SLOT_OPTIONS.find(
                                            (o) =>
                                                String(o.value) ===
                                                outageSlotDuration,
                                        )?.label ?? `${outageSlotDuration}s`
                                    }`,
                                ],
                                [
                                    "Window",
                                    `${new Date(batchStartTime).toLocaleString()} → ${new Date(batchEndTime).toLocaleString()}`,
                                ],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="flex items-center justify-between gap-4 px-4 py-3"
                                >
                                    <dt className="text-sm text-muted-foreground">
                                        {label}
                                    </dt>
                                    <dd className="text-sm font-medium">
                                        {value}
                                    </dd>
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
                                disabled={generateSchedule.isPending}
                            >
                                {generateSchedule.isPending
                                    ? "Generating..."
                                    : "Generate schedule"}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GenerateScheduleWizard;
