import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/user";

interface Type {
    allUsers?: User[],
    selectedUser?: User,
}

const initialState: Type = {
    allUsers: undefined,
    selectedUser: undefined,
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
    },
});

const { setAllUsers, setSelectedUser } = userSlice.actions;

export default userSlice;
export { setAllUsers, setSelectedUser };


// {
//     firstName: '',
//         lastName: '',
//             words: [],
// }
