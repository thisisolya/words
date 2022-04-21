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

const currentCardNumberSelector = createSelector(
  cardState,
  ({ currentCardNumber }) => currentCardNumber,
);

const paginationDirectionSelector = createSelector(
  cardState,
  ({ paginationDirection }) => paginationDirection,
);

const editedCardSelector = createSelector(
  cardState,
  ({ editedCard }) => editedCard,
);

const newCardSelector = createSelector(
  cardState,
  ({ newCard }) => newCard,
);

const selectedLanguagesSelector = createSelector(
  cardState,
  ({ selectedLanguages }) => selectedLanguages,
);

const preferredLanguageSelector = createSelector(
  cardState,
  ({ preferredLanguage }) => preferredLanguage,
);

export {
  allCardsSelector,
  selectedCardsSelector,
  editedCardSelector,
  newCardSelector,
  selectedLanguagesSelector,
  preferredLanguageSelector,
  currentCardNumberSelector,
  paginationDirectionSelector,
};
