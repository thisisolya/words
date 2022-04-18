/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User, UserModelFromServer } from '../../types';
import { appAPI } from '../api';

export interface UserSlice {
  allUsers?: User[],
  selectedUser?: User,
}

const initialState: UserSlice = {
  allUsers: undefined,
  selectedUser: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    resetSelectedUser: (state) => {
      state.selectedUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appAPI.endpoints.getUserInfo.matchFulfilled,
      (state, { payload }) => {
        state.selectedUser = {
          firstName: payload.first_name,
          lastName: payload.last_name,
          id: payload._id,
        };
      },
    );
    builder.addMatcher(
      appAPI.endpoints.getAllUsers.matchFulfilled,
      (state, { payload }) => {
        state.allUsers = payload.map((user: UserModelFromServer) => ({
          firstName: user.first_name,
          lastName: user.last_name,
          id: user._id,
        }));
      },
    );
  },
});

const { setSelectedUser, resetSelectedUser } = userSlice.actions;
export { setSelectedUser, resetSelectedUser };

export default userSlice;
