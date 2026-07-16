import { AlertTriangle, Bell, ClipboardCheck, CreditCard, type LucideIcon } from "lucide-react";
import { INotificationItem, NotificationType } from "@/types";

export const notificationMeta: Record<NotificationType, { icon: LucideIcon; iconBg: string; iconColor: string }> = {
  verification: { icon: ClipboardCheck, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  dispute: { icon: AlertTriangle, iconBg: "bg-orange-100", iconColor: "text-orange-500" },
  payment: { icon: CreditCard, iconBg: "bg-red-100", iconColor: "text-red-500" },
  general: { icon: Bell, iconBg: "bg-muted", iconColor: "text-highlight" },
};

// TODO: replace with real notifications API data once the endpoint exists.
export const DUMMY_NOTIFICATIONS: INotificationItem[] = Array.from({ length: 26 }, (_, i) => {
  const template = [
    {
      title: "New seller verification pending",
      body: "Seller verification documents submitted for review.",
      type: "verification" as NotificationType,
    },
    {
      title: "Dispute opened",
      body: 'Order dispute reported for "Hair Styling & Branding".',
      type: "dispute" as NotificationType,
    },
    {
      title: "Payment failed",
      body: "Order #2345 payment of $700 could not be processed.",
      type: "payment" as NotificationType,
    },
  ][i % 3];

  return {
    _id: `${i + 1}`,
    title: template.title,
    body: template.body,
    type: template.type,
    time: i === 0 ? "2 minutes ago" : i === 1 ? "1 hour ago" : i === 2 ? "3 hours ago" : `${i} days ago`,
  };
});
