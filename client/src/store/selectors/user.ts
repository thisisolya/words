import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '..';

const localState = ((state: AppState) => state.user);

const allUsersList = createSelector(
  localState,
  ({ allUsers }) => allUsers,
);

const selectedUserInfo = createSelector(
  localState,
  ({ selectedUser }) => selectedUser,
);

export { allUsersList, selectedUserInfo };
