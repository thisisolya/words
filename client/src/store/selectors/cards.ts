import { createSelector } from '@reduxjs/toolkit';
import {
  and, isEmpty, filter, path, startsWith, prop, ifElse, pipe,
} from 'ramda';

import { identity } from 'lodash';
import { AUTOCOMPLETE_OPTIONS } from '../../helpers/constats';
import { CardSlice } from '../slices/card-slice';
import { AppState } from '../index';

const cardState = ((state: AppState) => path(['card'])(state) as CardSlice);
const createBasicSelector = (pathToState: string[]) => createSelector(
  cardState,
  identity(path(pathToState)),
);

const getAutocompleteOptions = (modifiableWord: Record<string, string>) => {
  const language = prop('language', modifiableWord);
  const filterable = prop('filterable', modifiableWord);
  const result = ifElse(
    () => and(!isEmpty(language), !isEmpty(filterable)),
    () => filter(
      (option: string) => startsWith(filterable, option),
      AUTOCOMPLETE_OPTIONS[language as keyof typeof AUTOCOMPLETE_OPTIONS],
    ),
    () => identity([]),
  );
  return result();
};

const allCardsSelector = createBasicSelector(['allCards']);
const selectedCardsSelector = createBasicSelector(['selectedCards']);
const currentCardNumberSelector = createBasicSelector(['currentCardNumber']);
const paginationDirectionSelector = createBasicSelector(['paginationDirection']);
const modifiableCardSelector = createBasicSelector(['modifiableCard']);
const selectedLanguagesSelector = createBasicSelector(['selectedLanguages']);
const preferredLanguageSelector = createBasicSelector(['preferredLanguage']);
const firstAutocompleteSelector = createSelector(
  cardState,
  ({ modifiableCard }) => getAutocompleteOptions(path(['first'], modifiableCard) as Record<string, string>),
);
const secondAutocompleteSelector = createSelector(
  cardState,
  ({ modifiableCard }) => getAutocompleteOptions(path(['second'], modifiableCard) as Record<string, string>),
);

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
