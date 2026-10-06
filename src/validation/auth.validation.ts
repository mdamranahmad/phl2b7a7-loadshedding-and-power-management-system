import z from "zod";

export const loginZschema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 character")
        .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
        .regex(/[a-z]/, "Password must contain atleast one lowercase letter")
        .regex(/[0-9]/, "Password must contain atleast one number"),
});
