import { IGetMarketplaceListingsResponse, IGetMarketplaceOrdersResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetListingsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  type?: string;
  status?: string;
}

interface GetOrdersArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
}

const marketplaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarketplaceListings: builder.query<IGetMarketplaceListingsResponse, GetListingsArgs>({
      query: ({ page, limit, searchParams, type, status }) => ({
        url: "/admin/marketplace/listings",
        method: "GET",
        params: { page, limit, searchParams, type, status },
      }),
      providesTags: [tagTypes.listing],
    }),
    deleteMarketplaceListing: builder.mutation({
      query: (req) => ({
        url: `/admin/marketplace/listings/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.listing],
    }),
    getMarketplaceOrders: builder.query<IGetMarketplaceOrdersResponse, GetOrdersArgs>({
      query: ({ page, limit, searchParams }) => ({
        url: "/admin/marketplace/orders",
        method: "GET",
        params: { page, limit, searchParams },
      }),
      providesTags: [tagTypes.marketplaceOrder],
    }),
  }),
});

export const {
  useGetMarketplaceListingsQuery,
  useDeleteMarketplaceListingMutation,
  useGetMarketplaceOrdersQuery,
} = marketplaceApi;

export default marketplaceApi;
