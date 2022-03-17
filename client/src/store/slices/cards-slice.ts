import { createSlice } from "@reduxjs/toolkit"
import { Card } from "../../types/cards";

interface WordsInitialType {
    allCards?: Card[],
}

const initialState: WordsInitialType = {
    allCards: undefined,
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setAllCards: (state, action) => {
            state.allCards = action.payload;
        },
    },
});

const { setAllCards } = cardsSlice.actions;

export default cardsSlice;
export { setAllCards };
