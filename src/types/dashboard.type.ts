import { IPlatformUser } from "./user.type";

export interface IOverviewStats {
  totalUsers: number;
  activeToday: number;
  totalSubscribers: number;
  totalVideos: number;
  totalListings: number;
  overallRevenue: number;
  activeCampaigns: number;
  openTickets: number;
}

export interface IUserOverviewPoint {
  month: string;
  users: number;
}

export interface IEarningOverviewPoint {
  month: string;
  earnings: number;
}

export interface IOverviewData {
  stats: IOverviewStats;
  userOverview: IUserOverviewPoint[];
  earningOverview: IEarningOverviewPoint[];
  recentUsers: IPlatformUser[];
}

export interface IGetOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IOverviewData;
}

export interface IGetEarningOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IEarningOverviewPoint[];
}
