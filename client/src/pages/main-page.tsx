import React from "react";
import styled from "@emotion/styled";

import { Route, Routes } from "react-router-dom";
import UserList from "../components/users/user-list";
import WordList from "../components/words/word-list";
import CreateUser from "../components/users/create-user";
import theme from "../theme";
import { useDispatch } from "react-redux";
import { setAllUsers, setChosenUser } from '../store/slices/user-slice';
import { setAllWords, setAddedWord } from '../store/slices/word-slice';
import store from "../store";

const ApplicationContainer = styled("div")({
  minHeight: "100vh",
  minWidth: "100vw",
  height: "100%",
  width: "100%",
  backgroundColor: theme.palette.secondary.light,
});

const MainPage = () => {

  const dispatch = useDispatch();
  const { selectedUser, allUsers } = store.getState().users;
  const { allWords } = store.getState().words;

  React.useEffect(() => {
    dispatch(setAllUsers([{ firstName: 'Olga', lastName: 'Pin' }]))
    selectedUser && dispatch(setAllWords([{ ru: 'ala', eng: 'lala' }]))
  }, [])

  return (
    <ApplicationContainer>
      <Routes>
        <Route path="/" element={<UserList allUsers={allUsers} selectedUser={selectedUser} />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/cards" element={<WordList allWords={allWords} />} />
      </Routes>
    </ApplicationContainer>
  );
};

export default MainPage;
