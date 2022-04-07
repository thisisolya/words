/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CurrentCard, NewCard } from '../../types';

export interface CardSlice {
  currentCard: CurrentCard,
  newCard: NewCard,
  editedCard: CurrentCard,
  preferredLanguage: string,
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
      state.newCard = { ...state.newCard, ...action.payload };
    },
    setPreferredLanguage: (state, action) => {
      state.preferredLanguage = action.payload;
    },
  },
});

const {
  setPreferredLanguage, setCurrentCard, setNewCard, clearNewCard,
} = cardSlice.actions;
export {
  setPreferredLanguage, setCurrentCard, setNewCard, clearNewCard,
};

export default cardSlice;
