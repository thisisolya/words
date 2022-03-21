import { createSlice } from "@reduxjs/toolkit"
import { User } from "../types";

interface InitialStateType {
    allUsers?: User[],
    selectedUser?: User,
}

const initialState: InitialStateType = {
    allUsers: undefined,
    selectedUser: undefined,
}

const appSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = state.allUsers ? Array.from(new Set([...state.allUsers, ...action.payload])) : action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = { ...state.selectedUser, ...action.payload };
        },
    },
});

const { setAllUsers, setSelectedUser } = appSlice.actions;

export default appSlice;
export { setAllUsers, setSelectedUser };
