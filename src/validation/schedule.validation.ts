import z from "zod";

/** Accepts string form input (numbers as text) and outputs numbers. */
const numberField = (
  label: string,
  opts: { int?: boolean; positive?: boolean; nonnegative?: boolean },
) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .regex(/^\d+(\.\d+)?$/, `Enter a valid ${label.toLowerCase()}`)
    .transform(Number)
    .superRefine((value, ctx) => {
      if (opts.int && !Number.isInteger(value)) {
        ctx.addIssue({
          code: "custom",
          message: `${label} must be a whole number`,
        });
      }
      if (opts.positive && value <= 0) {
        ctx.addIssue({
          code: "custom",
          message: `${label} must be greater than 0`,
        });
      }
      if (opts.nonnegative && value < 0) {
        ctx.addIssue({
          code: "custom",
          message: `${label} cannot be negative`,
        });
      }
    });

const allocationShape = {
  capacityKw: numberField("Capacity", { positive: true }),
  allocatedKw: numberField("Allocated load", { nonnegative: true }),
};

const timingShape = {
  scheduleDuration: z.string().min(1, "Schedule duration is required"),
  outageSlotDuration: z.string().min(1, "Outage slot duration is required"),
  batchStartTime: z.string().min(1, "Start date & time is required"),
  batchEndTime: z.string().min(1, "End date & time is required"),
};

/** POST /subStationManager/allocate-kw payload. */
export const allocateKwZschema = z
  .object(allocationShape)
  .refine((values) => values.allocatedKw <= values.capacityKw, {
    message: "Allocated kW cannot exceed the substation capacity",
    path: ["allocatedKw"],
  });

/** Wizard step 1 — power allocation. */
export const scheduleAllocationZSchema = allocateKwZschema;

/** Wizard step 2 — durations (seconds) + ISO datetimes. */
export const scheduleTimingZSchema = z
  .object(timingShape)
  .refine((values) => values.outageSlotDuration <= values.scheduleDuration, {
    message: "Slot duration cannot exceed the total schedule duration",
    path: ["outageSlotDuration"],
  })
  .refine(
    (values) => new Date(values.batchStartTime) < new Date(values.batchEndTime),
    {
      message: "Schedule must start before schedule end time!",
      path: ["batchStartTime"],
    },
  );

/** Full payload for POST /subStationManager/generate-schedule. */
export const generateScheduleZschema = z
  .object({
    ...allocationShape,
    ...timingShape,
  })
  .refine((values) => values.allocatedKw <= values.capacityKw, {
    message: "Allocated kW cannot exceed the substation capacity",
    path: ["allocatedKw"],
  })
  .refine((values) => values.outageSlotDuration <= values.scheduleDuration, {
    message: "Slot duration cannot exceed the total schedule duration",
    path: ["outageSlotDuration"],
  })
  .refine(
    (values) => new Date(values.batchStartTime) < new Date(values.batchEndTime),
    {
      message: "Schedule must start before schedule end time!",
      path: ["batchStartTime"],
    },
  );
