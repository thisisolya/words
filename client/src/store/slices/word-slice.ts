import { createSlice } from "@reduxjs/toolkit"

const wordsSlice = createSlice({
    name: 'words',
    initialState: {
        allWords: undefined,
        newWord: undefined,
    },
    reducers: {
        setAllWords: (state, action) => {
            state.allWords = action.payload;
        },
        setAddedWord: (state, action) => {
            state.newWord = action.payload;
        },
    },
});

const { setAllWords, setAddedWord } = wordsSlice.actions;

export default wordsSlice;
export { setAllWords, setAddedWord };
