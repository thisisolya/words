import { createSelector } from '@reduxjs/toolkit';
import { prop } from 'ramda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userState = prop('utility') as any;

const isLoadingSelector = createSelector(
  userState,
  prop('isLoading'),
);

const alertSelector = createSelector(
  userState,
  prop('alert'),
);

const modalSelector = createSelector(
  userState,
  prop('modal'),
);

export { isLoadingSelector, alertSelector, modalSelector };
