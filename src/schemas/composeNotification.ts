import z from "zod";

export const composeNotificationSchema = z.object({
  message: z.string().min(1, "Notification message is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
  dateTime: z.date().optional(),
});

export type ComposeNotificationFormValues = z.infer<typeof composeNotificationSchema>;
