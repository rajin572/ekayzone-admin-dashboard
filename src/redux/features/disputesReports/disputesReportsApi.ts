import { IGetReportDetailResponse, IGetReportsResponse, IGetReportStatsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetReportsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  category?: string;
  status?: string;
}

const disputesReportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportStats: builder.query<IGetReportStatsResponse, void>({
      query: () => ({
        url: "/admin/reports/stats",
        method: "GET",
      }),
      providesTags: [tagTypes.reportsAnalytics],
    }),
    getReports: builder.query<IGetReportsResponse, GetReportsArgs>({
      query: ({ page, limit, searchParams, category, status }) => ({
        url: "/admin/reports",
        method: "GET",
        params: { page, limit, searchParams, category, status },
      }),
      providesTags: [tagTypes.reportsAnalytics],
    }),
    getReportDetail: builder.query<IGetReportDetailResponse, string>({
      query: (id) => ({
        url: `/admin/reports/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.reportsAnalytics],
    }),
    dismissReport: builder.mutation({
      query: (req) => ({
        url: `/admin/reports/${req.params.id}/dismiss`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.reportsAnalytics],
    }),
    warnCreator: builder.mutation({
      query: (req) => ({
        url: `/admin/reports/${req.params.id}/warn-creator`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.reportsAnalytics],
    }),
    removeContent: builder.mutation({
      query: (req) => ({
        url: `/admin/reports/${req.params.id}/remove-content`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.reportsAnalytics],
    }),
    suspendReportedAccount: builder.mutation({
      query: (req) => ({
        url: `/admin/reports/${req.params.id}/suspend-account`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.reportsAnalytics],
    }),
  }),
});

export const {
  useGetReportStatsQuery,
  useGetReportsQuery,
  useGetReportDetailQuery,
  useDismissReportMutation,
  useWarnCreatorMutation,
  useRemoveContentMutation,
  useSuspendReportedAccountMutation,
} = disputesReportsApi;

export default disputesReportsApi;
