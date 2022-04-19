import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../index';

const cardState = ((state: AppState) => state.card);

const allCardsSelector = createSelector(
  cardState,
  ({ allCards }) => allCards,
);

const selectedCardsSelector = createSelector(
  cardState,
  ({ selectedCards }) => selectedCards,
);

const editedCardSelector = createSelector(
  cardState,
  ({ editedCard }) => editedCard,
);

const newCardSelector = createSelector(
  cardState,
  ({ newCard }) => newCard,
);

export {
  allCardsSelector,
  selectedCardsSelector,
  editedCardSelector,
  newCardSelector,
};
