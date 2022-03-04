import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
        selectedUser: '',
    },
    reducers: {
        addAllUsers: (state, action) => state + action.payload,
        chooseUser: (state, action) => state + action.payload,
    },
});

const { addAllUsers, chooseUser } = userSlice.actions;

export default userSlice;
export { addAllUsers, chooseUser };


// {
//     firstName: '',
//         lastName: '',
//             words: [],
// }
