import { IMeta } from "./common.type";

export type NotificationAudience = "All Users" | "Free Users" | "Premium Users" | "Pro Users";

export interface ISentNotification {
  _id: string;
  message: string;
  audience: NotificationAudience;
  dateSent: string;
}

export interface IGetSentNotificationsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ISentNotification[];
    meta: IMeta;
  };
}
