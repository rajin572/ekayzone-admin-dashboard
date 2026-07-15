import { IGetSentNotificationsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface SendNotificationBody {
  message: string;
  targetAudience: string;
  scheduledAt?: string;
}

const communicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSentNotifications: builder.query<IGetSentNotificationsResponse, { page?: number; limit?: number }>({
      query: ({ page, limit }) => ({
        url: "/admin/communications/notifications",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.communication],
    }),
    sendNotification: builder.mutation<unknown, SendNotificationBody>({
      query: (body) => ({
        url: "/admin/communications/notifications",
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.communication],
    }),
  }),
});

export const { useGetSentNotificationsQuery, useSendNotificationMutation } = communicationApi;

export default communicationApi;
