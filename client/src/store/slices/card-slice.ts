/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { mergeRight } from 'ramda';
import { Card, CardModelFromServer, ModifiableCard } from '../../types';
import cardApi from '../apis/card-api';

export interface CardSlice {
  allCards?: Card[],
  modifiableCard: ModifiableCard,
  selectedCards?: Card[],
  selectedLanguages: string[],
  preferredLanguage: string,
  currentCardNumber: number,
  paginationDirection: boolean,
}

const initialState: CardSlice = {
  allCards: undefined,
  selectedCards: undefined,
  modifiableCard: {
    first: {
      language: '',
      word: '',
      filterable: '',
    },
    second: {
      language: '',
      word: '',
      filterable: '',
    },
  },
  preferredLanguage: '',
  selectedLanguages: [],
  currentCardNumber: 0,
  paginationDirection: true,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;
    },
    setModifiableFirstCard: (state, action) => {
      state.modifiableCard.first = mergeRight(state.modifiableCard.first || {}, action.payload);
    },
    setModifiableSecondCard: (state, action) => {
      state.modifiableCard.second = mergeRight(state.modifiableCard.second || {}, action.payload);
    },
    clearModifiableCard: (state) => {
      state.modifiableCard = initialState.modifiableCard;
    },
    setPreferredLanguage: (state, action) => {
      state.preferredLanguage = action.payload;
    },
    setSelectedLanguages: (state, action) => {
      state.selectedLanguages = action.payload;
    },
    setCurrentCardNumber: (state, action) => {
      state.currentCardNumber += action.payload;
      state.paginationDirection = action.payload === 1;
    },
    resetCurrentCardNumber: (state) => {
      state.currentCardNumber = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cardApi.endpoints.getAllCards.matchFulfilled,
      (state, { payload }) => {
        state.allCards = payload.map((card: CardModelFromServer) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { user_id, _id, ...words } = card;
          return ({
            ...words,
            userId: card.user_id,
            cardId: card._id,
          });
        });
      },
    );
    builder.addMatcher(
      cardApi.endpoints.getSelectedCards.matchFulfilled,
      (state, { payload }) => {
        state.selectedCards = payload.map((card: CardModelFromServer) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { user_id, _id, ...words } = card;
          return ({
            ...words,
            userId: card.user_id,
            cardId: card._id,
          });
        });
      },
    );
  },
});

const {
  setPreferredLanguage,
  setSelectedLanguages,
  setModifiableFirstCard,
  setModifiableSecondCard,
  clearModifiableCard,
  setSelectedCards,
  resetCurrentCardNumber,
  setCurrentCardNumber,
} = cardSlice.actions;
export {
  setPreferredLanguage,
  setModifiableFirstCard,
  setModifiableSecondCard,
  clearModifiableCard,
  setSelectedLanguages,
  setSelectedCards,
  setCurrentCardNumber,
  resetCurrentCardNumber,
};

export default cardSlice;
