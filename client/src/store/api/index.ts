import cardApi from './cardApi';
import userApi from './userApi';

const {
  useGetAllCardsQuery,
  useCreateNewCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
} = cardApi;

const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useCreateNewUserMutation,
  useDeleteUserMutation,
  useEditUserInfoMutation,
} = userApi;

export {
  cardApi,
  userApi,
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useCreateNewUserMutation,
  useDeleteUserMutation,
  useEditUserInfoMutation, useGetAllCardsQuery,
  useCreateNewCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
};
