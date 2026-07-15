import { IGetPromotionsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetPromotionsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  status?: string;
}

const promotionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromotions: builder.query<IGetPromotionsResponse, GetPromotionsArgs>({
      query: ({ page, limit, searchParams, status }) => ({
        url: "/admin/promotions",
        method: "GET",
        params: { page, limit, searchParams, status },
      }),
      providesTags: [tagTypes.advertisement],
    }),
    deletePromotion: builder.mutation({
      query: (req) => ({
        url: `/admin/promotions/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.advertisement],
    }),
  }),
});

export const { useGetPromotionsQuery, useDeletePromotionMutation } = promotionApi;

export default promotionApi;
