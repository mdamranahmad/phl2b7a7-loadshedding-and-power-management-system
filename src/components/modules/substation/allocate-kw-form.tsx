"use client";

import { useForm } from "@tanstack/react-form";
import { Gauge, Save } from "lucide-react";
import PageHeader from "@/components/modules/common/page-header";
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { useAllocateKw, useSubStationAnalytics } from "@/hooks";
import { getApiErrorMessage } from "@/lib/error";
import { allocateKwZschema } from "@/validation";

const AllocateKwForm = () => {
  const allocateKw = useAllocateKw();
  const { data: analytics, isPending } = useSubStationAnalytics();

  const form = useForm({
    defaultValues: { capacityKw: "", allocatedKw: "" },
    validators: { onSubmit: allocateKwZschema },
    onSubmit: async ({ value }) => {
      try {
        await allocateKw.mutateAsync({
          capacityKw: Number(value.capacityKw),
          allocatedKw: Number(value.allocatedKw),
        });
        toast.add({
          title: "Allocation updated",
          description:
            "The new kW values apply to schedules generated from now on.",
          type: "success",
        });
      } catch (error) {
        toast.add({
          title: "Could not update allocation",
          description: getApiErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <PageHeader
        title="Allocate kW"
        description="Set your substation's capacity and the load allocated to outage scheduling."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="size-4 text-primary" />
            Power allocation
          </CardTitle>
          <CardDescription>
            {isPending
              ? "Loading current values..."
              : `${analytics?.data.totalFeeders ?? 0} feeders across ${analytics?.data.totalAreas ?? 0} areas, serving ${analytics?.data.totalHouses ?? 0} houses`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="capacityKw">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Substation capacity (kW)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="number"
                      min={0}
                      step="any"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="500"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldDescription className="text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Field name="allocatedKw">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Allocated load (kW)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="number"
                      min={0}
                      step="any"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="350"
                    />
                    {field.state.meta.errors.length > 0 ? (
                      <FieldDescription className="text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </FieldDescription>
                    ) : (
                      <FieldDescription>
                        Must not exceed the substation capacity.
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Subscribe selector={(state) => [state.isSubmitting]}>
                {([isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={isSubmitting || allocateKw.isPending}
                  >
                    {allocateKw.isPending ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="size-4" />
                        Save allocation
                      </>
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {isPending && <Skeleton className="h-24 rounded-2xl" />}
    </div>
  );
};

export default AllocateKwForm;
