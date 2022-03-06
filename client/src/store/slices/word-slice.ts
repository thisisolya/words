import { createSlice } from "@reduxjs/toolkit"

const wordsSlice = createSlice({
    name: 'words',
    initialState: {
        allWords: [],
        newWord: undefined,
    },
    reducers: {
        setAllWords: (state, action) =>  {
            Object.assign(state.allWords ,action.payload)
        },
        setAddedWord: (state, action) => {
            Object.assign(state.newWord, action.payload)
        },
    },
});

const { setAllWords, setAddedWord } = wordsSlice.actions;

export default wordsSlice;
export { setAllWords, setAddedWord };
