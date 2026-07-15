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

export type RecentUserPlan = "Free" | "Premium" | "Pro";
export type RecentUserStatus = "Active" | "Suspended" | "Banned";

export interface IRecentUser {
  _id: string;
  displayId: string;
  fullName: string;
  email: string;
  gender: string;
  phone: string;
  age: number;
  plan: RecentUserPlan;
  status: RecentUserStatus;
  username: string;
  avatar?: string;
  joinDate: string;
  followers: number;
  following: number;
  activeCampaigns: number;
}

export interface IOverviewData {
  stats: IOverviewStats;
  userOverview: IUserOverviewPoint[];
  earningOverview: IEarningOverviewPoint[];
  recentUsers: IRecentUser[];
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
