import { IGetNotificationsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetNotificationsArgs {
  page?: number;
  limit?: number;
}

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<IGetNotificationsResponse, GetNotificationsArgs>({
      query: ({ page, limit }) => ({
        url: "/admin/notifications",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.notification],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;

export default notificationApi;
