import { IGetProfileResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IGetProfileResponse, void>({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.settings],
    }),
    // body: FormData { data: JSON.stringify({ fullName }), avatar?: File } — email is read-only, not sent.
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.settings],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;

export default profileApi;
