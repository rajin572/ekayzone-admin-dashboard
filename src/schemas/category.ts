import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category title is required"),
  icon: z.any().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
