/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  Card, CardModelFromServer, CurrentCard, NewCard,
} from '../../types';
import { appAPI } from '../api';

export interface CardSlice {
  allCards?: Card[],
  selectedCards?: Card[],
  currentCard: CurrentCard,
  newCard: NewCard,
  editedCard: CurrentCard,
  preferredLanguage: string,
  selectedLanguages: string[],
}

const initialState: CardSlice = {
  allCards: undefined,
  selectedCards: undefined,
  currentCard: {
    firstLanguage: '',
    secondLanguage: '',
    firstWord: '',
    secondWord: '',
    cardId: '',
    userId: '',
  },
  editedCard: {
    firstLanguage: '',
    secondLanguage: '',
    firstWord: '',
    secondWord: '',
    cardId: '',
    userId: '',
  },
  newCard: {
    firstLanguage: '',
    secondLanguage: '',
    firstWord: '',
    secondWord: '',
  },
  preferredLanguage: '',
  selectedLanguages: [],
};

const cardSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;
    },
    setCurrentCard: (state, action) => {
      state.currentCard = action.payload;
    },
    setNewCard: (state, action) => {
      state.newCard = { ...state.newCard, ...action.payload };
    },
    clearNewCard: (state) => {
      state.newCard = initialState.newCard;
    },
    setEditedCard: (state, action) => {
      state.editedCard = { ...state.editedCard, ...action.payload };
    },
    setPreferredLanguage: (state, action) => {
      state.preferredLanguage = action.payload;
    },
    setSelectedLanguages: (state, action) => {
      state.selectedLanguages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appAPI.endpoints.getAllCards.matchFulfilled,
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
  },
});

const {
  setPreferredLanguage,
  setCurrentCard,
  setNewCard,
  clearNewCard,
  setEditedCard,
  setSelectedLanguages, setSelectedCards,
} = cardSlice.actions;
export {
  setPreferredLanguage,
  setCurrentCard,
  setNewCard,
  clearNewCard,
  setEditedCard,
  setSelectedLanguages, setSelectedCards,
};

export default cardSlice;
