import { IMeta } from "./common.type";

export interface IRevenueStats {
  monthlyRevenue: number;
  subscriptionRevenue: number;
  promotionsRevenue: number;
  overallRevenue: number;
}

export type TransactionType = "Subscription" | "Promotion" | "Listing Fee";
export type TransactionMethod = "Card" | "Bank Transfer" | "Wallet";
export type TransactionStatus = "Completed" | "Pending" | "Failed";

export interface ITransaction {
  _id: string;
  displayId: string;
  user: string;
  amount: number;
  type: TransactionType;
  method: TransactionMethod;
  status: TransactionStatus;
  transactionId: string;
  date: string;
}

export interface IGetRevenueStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IRevenueStats;
}

export interface IGetTransactionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ITransaction[];
    meta: IMeta;
  };
}
