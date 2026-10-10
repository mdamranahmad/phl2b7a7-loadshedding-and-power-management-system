import z from "zod";
import { passwordRule } from "@/validation/auth.validation";

/** Inner `data` JSON of the multipart technician application. */
export const applyAsTechnicianZSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: passwordRule,
  address: z.string().trim().min(2, "Address must be at least 2 characters"),
  expertise: z.string().trim().min(1, "Expertise is required"),
  experienceYear: z.coerce
    .number({ error: "Experience is required" })
    .int("Experience must be a whole number of years")
    .nonnegative("Experience cannot be negative"),
});

/** Wizard step 1 — account credentials (incl. password confirmation). */
export const technicianApplyAccountZSchema = applyAsTechnicianZSchema
  .pick({
    name: true,
    email: true,
    password: true,
  })
  .extend({
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/** Wizard step 2 — professional details. */
export const technicianApplyDetailsZSchema = applyAsTechnicianZSchema.pick({
  address: true,
  expertise: true,
  experienceYear: true,
});
