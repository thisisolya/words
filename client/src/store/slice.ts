/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

export interface AppSlice {
  allUsers?: User[],
  selectedUser?: User,
}

const initialState: AppSlice = {
  allUsers: undefined,
  selectedUser: undefined,
};

const appSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = { ...state.selectedUser, ...action.payload };
    },
    resetSelectedUser: (state) => {
      state.selectedUser = undefined;
    },
  },
});

const { setAllUsers, setSelectedUser, resetSelectedUser } = appSlice.actions;

export default appSlice;
export { setAllUsers, setSelectedUser, resetSelectedUser };
