/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CurrentCard, NewCard } from '../../types';

export interface CardSlice {
  currentCard: CurrentCard,
  newCard: NewCard,
  editedCard: CurrentCard,
  preferredLanguage: string,
  selectedLanguages: string[],
}

const initialState: CardSlice = {
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
    setCardLanguages: (state, action) => {
      state.selectedLanguages = action.payload;
    },
  },
});

const {
  setPreferredLanguage,
  setCurrentCard,
  setNewCard,
  clearNewCard,
  setEditedCard,
  setCardLanguages,
} = cardSlice.actions;
export {
  setPreferredLanguage,
  setCurrentCard,
  setNewCard,
  clearNewCard,
  setEditedCard,
  setCardLanguages,
};

export default cardSlice;
