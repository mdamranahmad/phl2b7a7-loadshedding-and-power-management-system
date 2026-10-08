import z from "zod";

export const contactZSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be atleast 2 characters")
    .max(60, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be atleast 3 characters")
    .max(120, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be atleast 10 characters")
    .max(2000, "Message is too long"),
});

export type IContactFormValues = z.infer<typeof contactZSchema>;
