import { IMeta } from "./common.type";

export type PromotionStatus = "Active" | "Paused" | "Completed" | "Rejected";

export interface IPromotion {
  _id: string;
  displayId: string;
  creator: string;
  videoTitle: string;
  videoThumbnail?: string;
  product: string;
  goal: string;
  budget: number;
  spendPercentage: number;
  reach: number;
  daysLeft: number;
  status: PromotionStatus;
}

export interface IGetPromotionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IPromotion[];
    meta: IMeta;
  };
}
