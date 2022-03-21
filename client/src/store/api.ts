import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const appAPI = createApi({
    reducerPath: 'appAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    tagTypes: ['Users', 'Cards'],
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: (endpoint) => (`${endpoint}`),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }: { id: any }) => ({ type: 'Users' as const, id })),
                        { type: 'Users', id: 'LIST' },
                    ]
                    : [{ type: 'Users', id: 'LIST' }],
        }),
        getUserInfo: build.query({
            query: (body) => ({
                url: 'user',
                method: 'POST',
                body,
            }),
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
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }: { id: any }) => ({ type: 'Cards' as const, id })),
                    { type: 'Cards', id: 'LIST' },
                ]
                : [{ type: 'Cards', id: 'LIST' }],
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
    })
})

export const { useGetAllUsersQuery,
    useGetUserInfoQuery,
    useCreateNewUserMutation,
    useGetAllCardsQuery,
    useCreateNewCardMutation,
    useDeleteCardMutation,
    useEditCardMutation } = appAPI;
