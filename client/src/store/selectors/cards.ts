import { createSelector } from '@reduxjs/toolkit';
import {
  and, isEmpty, filter, path, startsWith,
} from 'ramda';

import { AUTOCOMPLETE_OPTIONS } from '../../helpers/constats';
import { Card, ModifiableCard } from '../../types/index';
import { CardSlice } from '../slices/card-slice';
import { AppState } from '../index';

const extractObject = (key: string[]) => path(key);
const cardState = ((state: AppState) => extractObject(['card'])(state) as CardSlice);

const createCustomizedSelector = (arg: string[]) => createSelector(
  cardState,
  extractObject([...arg]),
) as any;

const getAutocompleteOptions = (autocompleteNumber: string, modifiableCard: any) => {
  const language = path([autocompleteNumber, 'language'], modifiableCard) as string;
  const filterable = path([autocompleteNumber, 'filterable'], modifiableCard) as string;
  const isReadyToFilter = and(!isEmpty(language), !isEmpty(filterable));

  const result = isReadyToFilter
    ? filter(
      (option: string) => startsWith(filterable, option),
      AUTOCOMPLETE_OPTIONS[language as keyof typeof AUTOCOMPLETE_OPTIONS],
    )
    : [];
  return result;
};

const allCardsSelector = createCustomizedSelector(['allCards']) as Card[] | undefined;
const selectedCardsSelector = createCustomizedSelector(['selectedCards']) as Card[] | undefined;
const currentCardNumberSelector = createCustomizedSelector(['currentCardNumber']) as number;
const paginationDirectionSelector = createCustomizedSelector(['paginationDirection']) as boolean;
const modifiableCardSelector = createCustomizedSelector(['modifiableCard']) as ModifiableCard;
const selectedLanguagesSelector = createCustomizedSelector(['selectedLanguages']) as any[];
const preferredLanguageSelector = createCustomizedSelector(['preferredLanguage']) as string;

const firstAutocompleteSelector = createSelector(
  cardState,
  ({ modifiableCard }) => getAutocompleteOptions('first', modifiableCard),
);

const secondAutocompleteSelector = createSelector(
  cardState,
  ({ modifiableCard }) => getAutocompleteOptions('second', modifiableCard),
);

// const allCardsSelector =  createSelector(
//   cardState,
//   ({ allCards }) => allCards,
// );

// const allCardsSelector =  createSelector(
//   cardState,
//   ({ selectedCards }) => selectedCards,
// );

// const currentCardNumberSelector = createSelector(
//   cardState,
//   ({ currentCardNumber }) => currentCardNumber,
// );

// const paginationDirectionSelector = createSelector(
//   cardState,
//   ({ paginationDirection }) => paginationDirection,
// );

// const modifiableCardSelector = createSelector(
//   cardState,
//   ({ modifiableCard }) => modifiableCard,
// );

// const selectedLanguagesSelector = createSelector(
//   cardState,
//   ({ selectedLanguages }) => selectedLanguages,
// );

// const preferredLanguageSelector = createSelector(
//   cardState,
//   ({ preferredLanguage }) => preferredLanguage,
// );

// const firstAutocompleteSelector = createSelector(
//   cardState,
//   ({ modifiableCard }) => {
//     const { filterable, language } = modifiableCard.first || {};
//     if (filterable && language) {
//       return filter(
//         (option) => startsWith(filterable, option),
//         AUTOCOMPLETE_OPTIONS[language as keyof typeof AUTOCOMPLETE_OPTIONS],
//       );
//     } return [];
//   },
// );

// const secondAutocompleteSelector = createSelector(
//   cardState,
//   ({ modifiableCard }) => {
//     const { filterable, language } = modifiableCard.second || {};
//     if (filterable && language) {
//       return filter(
//         (option) => startsWith(filterable, option),
//         AUTOCOMPLETE_OPTIONS[language as keyof typeof AUTOCOMPLETE_OPTIONS],
//       );
//     } return [];
//   },
// );

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
