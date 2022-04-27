import { createSelector } from '@reduxjs/toolkit';
import { filter, startsWith } from 'ramda';

import { AUTOCOMPLETE_OPTIONS } from '../../helpers/constats';
import { NewCard } from '../../types';
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

const autocompleteSelector = createSelector(
  [(state) => state,
    (_, count) => count,
  ],
  (state, count) => {
    if (state) {
      const filterable = state[`${count}Filterable`];
      const language = state[`${count}Language`];
      const checkIfStartsWith = (option: string) => filterable && startsWith(filterable, option);
      return language
      && filter(
        checkIfStartsWith,
        AUTOCOMPLETE_OPTIONS[language as keyof typeof AUTOCOMPLETE_OPTIONS],
      );
    } return [];
  },
) as (state: NewCard | undefined, count: string) => string[];

export {
  allCardsSelector,
  selectedCardsSelector,
  editedCardSelector,
  newCardSelector,
  selectedLanguagesSelector,
  preferredLanguageSelector,
  currentCardNumberSelector,
  paginationDirectionSelector,
  autocompleteSelector,
};
