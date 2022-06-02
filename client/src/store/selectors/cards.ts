/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from '@reduxjs/toolkit';
import {
  isEmpty, filter, path, startsWith, prop, pipe, length, map, keys, omit, includes, reverse, uniq,
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

const getLanguagePairs = (allCardsArray: any) => {
  const uniquePairs: any[] = [];
  console.log(allCardsArray);
  allCardsArray.map((card: any) => keys(card));
  // map((item) => keys(item))(allCardsArray);
  return uniquePairs || [];
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

const allLanguagePairsSelector = createSelector(
  cardState,
  pipe(
    path(['allCards']) as any,
    getLanguagePairs,
  ),
);

export {
  allLanguagePairsSelector,
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
