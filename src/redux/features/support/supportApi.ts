import { IGetTicketDetailResponse, IGetTicketsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetTicketsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  priority?: string;
  status?: string;
}

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<IGetTicketsResponse, GetTicketsArgs>({
      query: ({ page, limit, searchParams, priority, status }) => ({
        url: "/admin/support/tickets",
        method: "GET",
        params: { page, limit, searchParams, priority, status },
      }),
      providesTags: [tagTypes.support],
    }),
    getTicketDetail: builder.query<IGetTicketDetailResponse, string>({
      query: (id) => ({
        url: `/admin/support/tickets/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.support],
    }),
    updateTicketPriority: builder.mutation({
      query: (req) => ({
        url: `/admin/support/tickets/${req.params.id}/priority`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.support],
    }),
    updateTicketStatus: builder.mutation({
      query: (req) => ({
        url: `/admin/support/tickets/${req.params.id}/status`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.support],
    }),
    sendTicketReply: builder.mutation({
      query: (req) => ({
        url: `/admin/support/tickets/${req.params.id}/reply`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.support],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketDetailQuery,
  useUpdateTicketPriorityMutation,
  useUpdateTicketStatusMutation,
  useSendTicketReplyMutation,
} = supportApi;

export default supportApi;
