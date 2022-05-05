import { createSelector } from '@reduxjs/toolkit';
import { prop } from 'ramda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userState = prop('user') as any;

const allUsersSelector = createSelector(
  userState,
  prop('allUsers'),
);

const selectedUserSelector = createSelector(
  userState,
  prop('selectedUser'),
);

export { allUsersSelector, selectedUserSelector };
