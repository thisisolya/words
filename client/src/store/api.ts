import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appAPI = createApi({
  reducerPath: 'appAPI',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_FETCH_BASE_URL }),
  tagTypes: ['Users', 'UserInfo', 'Cards'],
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
    getAllCards: build.query({
      query: (body) => ({
        url: 'cards',
        method: 'POST',
        body,
      }),
      providesTags: ['Cards'],
    }),
    createNewCard: build.mutation({
      query: (body) => ({
        url: 'cards/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cards'],
    }),
    deleteCard: build.mutation({
      query: (body) => ({
        url: 'cards/delete',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cards'],
    }),
    editCard: build.mutation({
      query: (body) => ({
        url: 'cards/edit',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cards'],
    }),
    deleteUser: build.mutation({
      query: (body) => ({
        url: 'user/delete',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    editUserInfo: build.mutation({
      query: (body) => ({
        url: 'user/edit',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserInfo'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useCreateNewUserMutation,
  useGetAllCardsQuery,
  useCreateNewCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
  useDeleteUserMutation,
  useEditUserInfoMutation,
} = appAPI;
