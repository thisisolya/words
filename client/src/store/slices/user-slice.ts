/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

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

const { setAllUsers, setSelectedUser, resetSelectedUser } = userSlice.actions;

export { setAllUsers, setSelectedUser, resetSelectedUser };

export default userSlice;
