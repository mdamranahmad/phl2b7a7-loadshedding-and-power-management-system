import z from "zod";
import type { TOutageSeverity } from "@/types";

export const OUTAGE_SEVERITIES = [
  "TOTAL_BLACKOUT",
  "PARTIAL_POWER",
  "DIM_LIGHTS",
  "NEIGHBORHOOD_WIDE",
  "OTHERS",
] as const satisfies readonly TOutageSeverity[];

export const reportOutageZschema = z.object({
  issueTitle: z
    .string()
    .trim()
    .min(3, "Issue title must be atleast 3 characters")
    .max(100, "Issue title must be at most 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be atleast 10 characters")
    .max(1000, "Description must be at most 1000 characters"),
  OutageSeverity: z.enum(OUTAGE_SEVERITIES, {
    error: "Please select an outage severity",
  }),
  outageStartTime: z.string().trim().min(1, "Outage start time is required"),
  address: z
    .string()
    .trim()
    .min(3, "Address must be atleast 3 characters")
    .max(200, "Address must be at most 200 characters"),
  isOngoing: z.boolean(),
});
