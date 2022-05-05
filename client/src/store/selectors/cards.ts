/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from '@reduxjs/toolkit';
import {
  isEmpty, filter, path, startsWith, prop, pipe, length,
} from 'ramda';
import { AUTOCOMPLETE_OPTIONS } from '../../helpers/constats';
import { ModifiableWord } from '../../types';

const cardState = prop('card') as any;
const getAutocompleteOptions = (item: ModifiableWord) => {
  const { language, filterable } = item;
  if (!isEmpty(language) && !isEmpty(filterable)) {
    return filter(
      (option: string) => startsWith(filterable, option),
    )(AUTOCOMPLETE_OPTIONS[language as keyof typeof AUTOCOMPLETE_OPTIONS]);
  }
  return [];
};

const allCardsSelector = createSelector(
  cardState,
  pipe(
    prop('allCards') as any,
    length,
  ),
);

const selectedCardsSelector = createSelector(
  cardState,
  prop('selectedCards'),
);

const paginationDirectionSelector = createSelector(
  cardState,
  prop('paginationDirection'),
);

const modifiableCardSelector = createSelector(
  cardState,
  prop('modifiableCard'),
);

const currentCardNumberSelector = createSelector(
  cardState,
  prop('currentCardNumber'),
);

const selectedLanguagesSelector = createSelector(
  cardState,
  prop('selectedLanguages'),
);

const preferredLanguageSelector = createSelector(
  cardState,
  prop('preferredLanguage'),
);

const firstAutocompleteSelector = createSelector(
  cardState,
  pipe(
    path(['modifiableCard', 'first']) as any,
    getAutocompleteOptions,
  ),
);

const secondAutocompleteSelector = createSelector(
  cardState,
  pipe(
    path(['modifiableCard', 'second']) as any,
    getAutocompleteOptions,
  ),
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
