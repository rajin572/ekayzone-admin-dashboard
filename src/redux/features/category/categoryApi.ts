import { IGetCategoriesResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetCategoriesArgs {
  page?: number;
  limit?: number;
  type?: string;
}

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<IGetCategoriesResponse, GetCategoriesArgs>({
      query: ({ page, limit, type }) => ({
        url: "/admin/categories",
        method: "GET",
        params: { page, limit, type },
      }),
      providesTags: [tagTypes.category],
    }),
    // body: FormData { data: JSON.stringify({ name, type }), icon: File }
    // `type` is always the currently active tab (Video/Product/Service) — not a form field.
    createCategory: builder.mutation({
      query: (req) => ({
        url: "/admin/categories",
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    updateCategory: builder.mutation({
      query: (req) => ({
        url: `/admin/categories/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    deleteCategory: builder.mutation({
      query: (req) => ({
        url: `/admin/categories/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
