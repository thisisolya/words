/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CurrentCard, NewCard } from '../../types';

export interface CardSlice {
  currentCard?: CurrentCard,
  newCard?: NewCard,
  preferredLanguage: string,
}

const initialState: CardSlice = {
  newCard: undefined,
  currentCard: undefined,
  preferredLanguage: 'russian',
};

const cardSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentCard: (state, action) => {
      state.currentCard = action.payload;
    },
    setNewCard: (state, action) => {
      state.newCard = action.payload;
    },
    setPreferredLanguage: (state, action) => {
      state.preferredLanguage = action.payload;
    },
  },
});

const { setPreferredLanguage, setCurrentCard, setNewCard } = cardSlice.actions;
export { setPreferredLanguage, setCurrentCard, setNewCard };

export default cardSlice;
