import { IGetFeedbackResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetFeedbackArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  mood?: string;
}

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query<IGetFeedbackResponse, GetFeedbackArgs>({
      query: ({ page, limit, searchParams, mood }) => ({
        url: "/admin/feedback",
        method: "GET",
        params: { page, limit, searchParams, mood },
      }),
      providesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetFeedbackQuery } = feedbackApi;

export default feedbackApi;
