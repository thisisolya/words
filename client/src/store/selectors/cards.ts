import { createSelector } from '@reduxjs/toolkit';
import { filter, startsWith } from 'ramda';

import { AUTOCOMPLETE_OPTIONS } from '../../helpers/constats';
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

const modifiableCardSelector = createSelector(
  cardState,
  ({ modifiableCard }) => modifiableCard,
);

const selectedLanguagesSelector = createSelector(
  cardState,
  ({ selectedLanguages }) => selectedLanguages,
);

const preferredLanguageSelector = createSelector(
  cardState,
  ({ preferredLanguage }) => preferredLanguage,
);

const firstAutocompleteSelector = createSelector(
  cardState,
  ({ modifiableCard }) => {
    const { filterable, language } = modifiableCard.first || {};
    if (filterable && language) {
      return filter(
        (option) => startsWith(filterable, option),
        AUTOCOMPLETE_OPTIONS[language as keyof typeof AUTOCOMPLETE_OPTIONS],
      );
    } return [];
  },
);

const secondAutocompleteSelector = createSelector(
  cardState,
  ({ modifiableCard }) => {
    const { filterable, language } = modifiableCard.second || {};
    if (filterable && language) {
      return filter(
        (option) => startsWith(filterable, option),
        AUTOCOMPLETE_OPTIONS[language as keyof typeof AUTOCOMPLETE_OPTIONS],
      );
    } return [];
  },
);

export {
  allCardsSelector,
  selectedCardsSelector,
  modifiableCardSelector,
  selectedLanguagesSelector,
  preferredLanguageSelector,
  currentCardNumberSelector,
  paginationDirectionSelector,
  firstAutocompleteSelector,
  secondAutocompleteSelector,
};
