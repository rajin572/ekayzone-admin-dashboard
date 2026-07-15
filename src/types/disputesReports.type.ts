import { IMeta } from "./common.type";

export type ReportCategory = "Service" | "Product" | "User" | "Order Dispute" | "Video" | "Live Stream";
export type ReportStatus = "Pending" | "Resolved" | "Dismissed";

export interface IReportStats {
  pendingReports: number;
  totalResolved: number;
  avgResponseTimeHours: number;
}

export interface IReporter {
  name: string;
  handle: string;
  avatar?: string;
}

export interface IReport {
  _id: string;
  displayId: string;
  reporter: string;
  reportedUser: string;
  category: ReportCategory;
  reportedItem: string;
  reportedItemImage?: string;
  listedBy?: string;
  reportedReason: string;
  reportedDetails: string;
  status: ReportStatus;
  date: string;
  timeAgoLabel: string;
  reportedBy: IReporter[];
}

export interface IGetReportStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IReportStats;
}

export interface IGetReportsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IReport[];
    meta: IMeta;
  };
}

export interface IGetReportDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IReport;
}
