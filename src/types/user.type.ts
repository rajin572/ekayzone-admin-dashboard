import { IMeta } from "./common.type";

export type UserPlan = "Free" | "Premium" | "Pro";
export type UserStatus = "Active" | "Suspended" | "Banned";

export interface IPlatformUser {
  _id: string;
  displayId: string;
  fullName: string;
  email: string;
  gender: string;
  phone: string;
  age: number;
  plan: UserPlan;
  status: UserStatus;
  username: string;
  avatar?: string;
  joinDate: string;
  followers: number;
  following: number;
  activeCampaigns: number;
}

export interface IGetUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IPlatformUser[];
    meta: IMeta;
  };
}

export interface IGetUserDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IPlatformUser;
}
