import z from "zod";

export const loginZSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 character")
        .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
        .regex(/[a-z]/, "Password must contain atleast one lowercase letter")
        .regex(/[0-9]/, "Password must contain atleast one number"),
});

export const CustomerRegistrationZSchema = z
    .object({
        name: z
            .string("Not A String!!")
            .min(3, "Name must contain atleast 3 Characters!")
            .max(20),
        email: z.email({ error: "Email is required" }),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Add at least one uppercase letter")
            .regex(/[a-z]/, "Add at least one lowercase letter")
            .regex(/[0-9]/, "Add at least one number"),
        confirmPassword: z.string(),
        meterNumber: z
            .string()
            .refine((value) => value === "" || value.length === 12, {
                message: "Please provide your 12 digit meter meter number",
                path: ["meterNumber"],
            }),
    })
    .refine((value) => value.password === value.confirmPassword, {
        error: "Password does not match",
        path: ["confirmPassword"],
    });
// const CustomerRegistrationZSchema = z.object({
//     name: z
//         .string("Not A String!!")
//         .min(3, "Name must contain atleast 3 Characters!")
//         .max(20),
//     email: z.email(),
//     password: z
//         .string()
//         .min(8, "Password must be at least 8 characters")
//         .regex(/[A-Z]/, "Add at least one uppercase letter")
//         .regex(/[a-z]/, "Add at least one lowercase letter")
//         .regex(/[0-9]/, "Add at least one number"),
//     customerProfile: z
//         .object({
//             meterNumber: z.string().optional(),
//         })
//         .optional(),
// });
