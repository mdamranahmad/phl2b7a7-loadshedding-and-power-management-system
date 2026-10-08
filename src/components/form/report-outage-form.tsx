"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useReportOutage } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";
import { OUTAGE_SEVERITIES, reportOutageZschema } from "@/validation";

const SEVERITY_LABELS: Record<string, string> = {
  TOTAL_BLACKOUT: "Total blackout",
  PARTIAL_POWER: "Partial power",
  DIM_LIGHTS: "Dim lights",
  NEIGHBORHOOD_WIDE: "Neighbourhood-wide",
  OTHERS: "Others",
};

const ReportOutageForm = () => {
  const reportMutation = useReportOutage();
  const [ticketNo, setTicketNo] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      issueTitle: "",
      description: "",
      OutageSeverity: "" as string,
      outageStartTime: "",
      address: "",
      isOngoing: true,
    },
    validators: { onSubmit: reportOutageZschema },
    onSubmit: async ({ value }) => {
      try {
        const response = await reportMutation.mutateAsync({
          OutageSeverity:
            value.OutageSeverity as (typeof OUTAGE_SEVERITIES)[number],
          issueTitle: value.issueTitle,
          description: value.description,
          outageStartTime: new Date(value.outageStartTime).toISOString(),
          address: value.address,
          isOngoing: value.isOngoing,
        });
        setTicketNo(response.data.ticketNo);
        toast.add({
          title: "Outage reported",
          description: `Ticket ${response.data.ticketNo} has been created.`,
          type: "success",
        });
        form.reset();
      } catch (error) {
        toast.add({
          title: "Could not submit report",
          description: getApiErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  if (ticketNo) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center">
        <div className="rounded-full bg-primary/10 p-4 text-primary">
          <CheckCircle2 className="size-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Report submitted</h2>
          <p className="text-sm text-muted-foreground">
            Your ticket number is{" "}
            <span className="font-mono font-medium text-foreground">
              {ticketNo}
            </span>
            . A zonal manager will review it shortly.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setTicketNo(null)}>
            Report another issue
          </Button>
          <Button render={<Link href="/customer">Back to dashboard</Link>} />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
      className="rounded-2xl border bg-card p-6"
    >
      <FieldGroup>
        <form.Field name="issueTitle">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Issue title</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="No power since morning"
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
          <form.Field name="OutageSeverity">
            {(field) => (
              <Field>
                <FieldLabel>Severity</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(next) => field.handleChange(String(next))}
                >
                  <SelectTrigger className="w-full" aria-label="Severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {OUTAGE_SEVERITIES.map((severity) => (
                      <SelectItem key={severity} value={severity}>
                        {SEVERITY_LABELS[severity] ?? severity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors.length > 0 && (
                  <FieldDescription className="text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          </form.Field>

          <form.Field name="outageStartTime">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Outage started at</FieldLabel>
                <Input
                  id={field.name}
                  type="datetime-local"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
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

        <form.Field name="address">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Address</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="House 12, Road 5, Dhanmondi"
              />
              {field.state.meta.errors.length > 0 && (
                <FieldDescription className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </FieldDescription>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                id={field.name}
                rows={5}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Describe what you're seeing..."
              />
              {field.state.meta.errors.length > 0 && (
                <FieldDescription className="text-destructive">
                  {field.state.meta.errors[0]?.message}
                </FieldDescription>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="isOngoing">
          {(field) => (
            <Field orientation="horizontal">
              <input
                id={field.name}
                type="checkbox"
                checked={field.state.value}
                onChange={(event) => field.handleChange(event.target.checked)}
                className="size-4 accent-primary"
              />
              <div className="space-y-0.5">
                <FieldLabel htmlFor={field.name}>
                  The outage is ongoing right now
                </FieldLabel>
                <FieldDescription>
                  Uncheck if the power came back before you submitted this
                  report.
                </FieldDescription>
              </div>
            </Field>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <Button
              type="submit"
              disabled={isSubmitting || reportMutation.isPending}
            >
              {reportMutation.isPending
                ? "Submitting..."
                : "Submit outage report"}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};

export default ReportOutageForm;
