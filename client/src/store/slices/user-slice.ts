/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { mergeRight } from 'ramda';
import { User, UserModelFromServer } from '../../types';
import userApi from '../apis/user-api';

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
    getAllUsersInfo: () => { },
    setAllUsersInfo: (state, { payload }) => {
      state.allUsers = payload;
    },
    setSelectedUserInfo: (state, { payload }) => {
      state.selectedUser = mergeRight(state.selectedUser || {}, payload);
    },
    setSelectedUserId: (state, { payload }) => {
      state.selectedUser = mergeRight(state.selectedUser || {}, payload);
    },
    resetSelectedUser: (state) => {
      state.selectedUser = undefined;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     userApi.endpoints.getAllUsers.matchFulfilled,
  //     (state, { payload }) => {
  //       state.allUsers = payload.map((user: UserModelFromServer) => ({
  //         firstName: user.first_name,
  //         lastName: user.last_name,
  //         id: user._id,
  //       }));
  //     },
  //   );
  // },
});

const {
  getAllUsersInfo, setAllUsersInfo, setSelectedUserInfo, setSelectedUserId, resetSelectedUser,
} = userSlice.actions;
export {
  getAllUsersInfo, setAllUsersInfo, setSelectedUserInfo, setSelectedUserId, resetSelectedUser,
};

export default userSlice;
