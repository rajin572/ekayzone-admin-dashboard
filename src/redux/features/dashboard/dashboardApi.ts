import { IGetEarningOverviewResponse, IGetOverviewResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<IGetOverviewResponse, void>({
      query: () => ({
        url: "/admin/dashboard/overview",
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),
    getEarningOverview: builder.query<IGetEarningOverviewResponse, { year: number }>({
      query: ({ year }) => ({
        url: "/admin/dashboard/earning-overview",
        method: "GET",
        params: { year },
      }),
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetEarningOverviewQuery,
} = dashboardApi;

export default dashboardApi;
