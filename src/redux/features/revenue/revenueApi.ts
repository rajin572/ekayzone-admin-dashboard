import { IGetRevenueStatsResponse, IGetTransactionsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetTransactionsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
}

const revenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueStats: builder.query<IGetRevenueStatsResponse, void>({
      query: () => ({
        url: "/admin/revenue/stats",
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),
    getTransactions: builder.query<IGetTransactionsResponse, GetTransactionsArgs>({
      query: ({ page, limit, searchParams }) => ({
        url: "/admin/revenue/transactions",
        method: "GET",
        params: { page, limit, searchParams },
      }),
      providesTags: [tagTypes.payment],
    }),
  }),
});

export const { useGetRevenueStatsQuery, useGetTransactionsQuery } = revenueApi;

export default revenueApi;
