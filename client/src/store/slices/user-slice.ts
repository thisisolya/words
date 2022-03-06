import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
        selectedUser: undefined,
    },
    reducers: {
        setAllUsers: (state, action) => {
            state = Object.assign(state.allUsers, action.payload);
        },
        setChosenUser: (state, action) => {
            state = Object.assign(state.selectedUser, action.payload);
        },
    },
});

const { setAllUsers, setChosenUser } = userSlice.actions;

export default userSlice;
export { setAllUsers, setChosenUser };


// {
//     firstName: '',
//         lastName: '',
//             words: [],
// }
