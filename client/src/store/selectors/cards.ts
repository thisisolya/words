import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '..';

const localState = ((state: AppState) => state.card);

const allCardsList = createSelector(
  localState,
  ({ allCards }) => allCards,
);

const selectedCardsList = createSelector(
  localState,
  ({ selectedCards }) => selectedCards,
);

// eslint-disable-next-line import/prefer-default-export
export { allCardsList, selectedCardsList };
