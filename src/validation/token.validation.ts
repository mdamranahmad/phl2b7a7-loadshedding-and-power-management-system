import z from "zod";

/** bKash token number: 20 digits as 5 hyphen-separated groups. */
export const TOKEN_NO_REGEX = /^(\d{4}-){4}\d{4}$/;

export const requestTokenZschema = z.object({
  rechargeAmount: z
    .string({ error: "Recharge amount is required" })
    .trim()
    .min(1, "Recharge amount is required")
    .regex(/^\d+(\.\d+)?$/, "Enter a valid amount")
    .transform(Number)
    .refine((value) => value > 0, {
      error: "Recharge amount must be greater than 0",
    }),
});

export const rechargeTokenZschema = z.object({
  TokenNo: z
    .string()
    .trim()
    .regex(
      TOKEN_NO_REGEX,
      "Invalid format. Must be XXXX-XXXX-XXXX-XXXX-XXXX (e.g. 8631-9280-8539-0600-1060)",
    ),
});
