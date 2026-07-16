import { IMeta } from "./common.type";

export type NotificationType = "verification" | "dispute" | "payment" | "general";

export interface INotificationItem {
  _id: string;
  title: string;
  body: string;
  time: string;
  type: NotificationType;
}

export interface IGetNotificationsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: INotificationItem[];
    meta: IMeta;
  };
}
