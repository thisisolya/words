/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { mergeRight } from 'ramda';
import { Card, ModifiableCard } from '../../types';

export interface CardSlice {
  allCards?: Card[],

  modifiableCard: ModifiableCard,
  selectedCards?: Card[],
  editedCard?: Record<string, string | number>;
  deletedCard?: Record<string, string | number>;
  createdCard?: Record<string, string | number>;
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
  deletedCard: {},
  createdCard: {},
  editedCard: {},
  preferredLanguage: '',
  selectedLanguages: [],
  currentCardNumber: 0,
  paginationDirection: true,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getAllCards: () => {},
    setAllCards: (state, action) => {
      state.allCards = action.payload;
    },
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;
    },
    initCardEditing: (state, { payload }) => {
      state.editedCard = payload;
    },
    initCardCreation: (state, { payload }) => {
      state.createdCard = payload;
    },
    initCardDeletion: (state, { payload }) => {
      state.deletedCard = payload;
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
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     cardApi.endpoints.getAllCards.matchFulfilled,
  //     (state, { payload }) => {
  //       state.allCards = payload.map((card: CardModelFromServer) => {
  //         // eslint-disable-next-line @typescript-eslint/naming-convention
  //         const { user_id, _id, ...words } = card;
  //         return ({
  //           ...words,
  //           userId: card.user_id,
  //           cardId: card._id,
  //         });
  //       });
  //     },
  //   );
  //   builder.addMatcher(
  //     cardApi.endpoints.getSelectedCards.matchFulfilled,
  //     (state, { payload }) => {
  //       state.selectedCards = payload.map((card: CardModelFromServer) => {
  //         // eslint-disable-next-line @typescript-eslint/naming-convention
  //         const { user_id, _id, ...words } = card;
  //         return ({
  //           ...words,
  //           userId: card.user_id,
  //           cardId: card._id,
  //         });
  //       });
  //     },
  //   );
  // },
});

const {
  getAllCards,
  setAllCards,
  setPreferredLanguage,
  setSelectedLanguages,
  setModifiableFirstCard,
  setModifiableSecondCard,
  clearModifiableCard,
  setSelectedCards,
  resetCurrentCardNumber,
  setCurrentCardNumber,
  initCardEditing,
  initCardCreation,
  initCardDeletion,
} = cardSlice.actions;
export {
  getAllCards,
  setAllCards,
  setPreferredLanguage,
  setModifiableFirstCard,
  setModifiableSecondCard,
  clearModifiableCard,
  setSelectedLanguages,
  setSelectedCards,
  setCurrentCardNumber,
  resetCurrentCardNumber, initCardEditing,
  initCardCreation,
  initCardDeletion,
};

export default cardSlice;
