import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_FETCH_BASE_URL }),
  tagTypes: ['Cards', 'SelectedCards'],
  endpoints: (build) => ({
    getAllCards: build.query({
      query: (body) => ({
        url: 'cards',
        method: 'POST',
        body,
      }),
      providesTags: ['Cards'],
    }),
    getSelectedCards: build.query({
      query: (body) => ({
        url: '/cards/selected',
        method: 'POST',
        body,
      }),
      providesTags: ['SelectedCards'],
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
      invalidatesTags: ['SelectedCards', 'Cards'],
    }),
    editCard: build.mutation({
      query: (body) => ({
        url: 'cards/edit',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SelectedCards', 'Cards'],
    }),
  }),
});

export default cardApi;

export const {
  useGetAllCardsQuery,
  useCreateNewCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
  useLazyGetSelectedCardsQuery,
} = cardApi;
