import z from "zod";

const passwordRule = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
    .regex(/[a-z]/, "Password must contain atleast one lowercase letter")
    .regex(/[0-9]/, "Password must contain atleast one number");

export const loginZschema = z.object({
    email: z.email("Please enter a valid email address"),
    password: passwordRule,
});

export const registerZschema = z
    .object({
        name: z
            .string()
            .min(3, "Name must be at least 3 characters")
            .max(20, "Name must be at most 20 characters"),
        email: z.email("Enter a valid email"),
        meterNumber: z.string().min(3, "Meter number is required"),
        password: z
            .string()
            .min(8, "At least 8 characters")
            .regex(/[A-Z]/, "Must include an uppercase letter")
            .regex(/[a-z]/, "Must include a lowercase letter")
            .regex(/[0-9]/, "Must include a number"),
        confirmPassword: z.string().min(1, "Confirm your password"),
    })
    .refine((v) => v.password === v.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// export const registerZschema = z
//   .object({
//     name: z
//       .string()
//       .trim()
//       .min(3, "Name must contain atleast 3 characters")
//       .max(20, "Name must be at most 20 characters"),
//     email: z.email("Please enter a valid email address"),
//     password: passwordRule,
//     confirmPassword: z.string(),
//     meterNumber: z
//       .string()
//       .trim()
//       .min(1, "Meter number is required")
//       .max(30, "Meter number is too long"),
//   })
//   .refine((values) => values.password === values.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

export const emailVerifyZschema = z.object({
    email: z.email("Please enter a valid email address"),
    otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export { passwordRule };
