import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/user";

interface UsersInitialType {
    allUsers?: User[],
    selectedUser?: User,
}

const initialState: UsersInitialType = {
    allUsers: undefined,
    selectedUser: undefined,
}

const usersSlice = createSlice({
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

const { setAllUsers, setSelectedUser } = usersSlice.actions;

export default usersSlice;
export { setAllUsers, setSelectedUser };
