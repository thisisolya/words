/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

export interface AppSlice {
  allUsers?: User[],
  selectedUser?: User,
  preferredLanguage: string,
}

const initialState: AppSlice = {
  allUsers: undefined,
  selectedUser: undefined,
  preferredLanguage: 'russian',
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
    setPreferredLanguage: (state, action) => {
      state.preferredLanguage = action.payload;
    },
  },
});

const {
  setAllUsers, setSelectedUser, resetSelectedUser, setPreferredLanguage,
} = appSlice.actions;

export default appSlice;
export {
  setAllUsers, setSelectedUser, resetSelectedUser, setPreferredLanguage,
};
