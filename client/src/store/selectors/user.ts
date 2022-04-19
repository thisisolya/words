import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../index';

const userState = ((state: AppState) => state.user);

const allUsersSelector = createSelector(
  userState,
  ({ allUsers }) => allUsers,
);

const selectedUserSelector = createSelector(
  userState,
  ({ selectedUser }) => selectedUser,
);

export { allUsersSelector, selectedUserSelector };
