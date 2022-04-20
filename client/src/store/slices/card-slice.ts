/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Card, CardModelFromServer, NewCard } from '../../types';
import cardApi from '../apis/card-api';

export interface CardSlice {
  allCards?: Card[],
  editedCard?: NewCard,
  newCard?: NewCard,
  selectedCards?: Card[],
  selectedLanguages: string[],
  preferredLanguage: string,
}

const initialState: CardSlice = {
  allCards: undefined,
  selectedCards: undefined,
  editedCard: undefined,
  newCard: undefined,
  preferredLanguage: '',
  selectedLanguages: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;
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
  setNewCard,
  clearNewCard,
  setEditedCard,
  setSelectedLanguages, setSelectedCards,
} = cardSlice.actions;
export {
  setPreferredLanguage,
  setNewCard,
  clearNewCard,
  setEditedCard,
  setSelectedLanguages, setSelectedCards,
};

export default cardSlice;
