import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_FETCH_BASE_URL }),
  tagTypes: ['Users', 'UserInfo'],
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (endpoint) => (`${endpoint}`),
      providesTags: ['Users'],
    }),
    getUserInfo: build.query({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
      providesTags: ['UserInfo'],
    }),
    createNewUser: build.mutation({
      query: (body) => ({
        url: 'user/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: build.mutation({
      query: (body) => ({
        url: 'user/delete',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    editUserInfo: build.mutation({
      query: (body) => ({
        url: 'user/edit',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['UserInfo', 'Users'],
    }),
  }),
});

export default userApi;

export const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useCreateNewUserMutation,
  useDeleteUserMutation,
  useEditUserInfoMutation,
} = userApi;
