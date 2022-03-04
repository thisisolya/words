import { createSlice } from "@reduxjs/toolkit"

const wordsSlice = createSlice({
    name: 'words',
    initialState: [],
    reducers: {
        getAllWords: (state, action) => state + action.payload,
        addWord: (state, action) => state + action.payload,
    },
});

const { getAllWords, addWord } = wordsSlice.actions;

export default wordsSlice;
export { getAllWords, addWord };
