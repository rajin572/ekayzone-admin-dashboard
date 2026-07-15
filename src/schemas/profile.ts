import z from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid email"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
