import React from "react";
import styled from "@emotion/styled";

import { Route, Routes } from "react-router-dom";
import UserList from "../components/users/user-list";
import WordList from "../components/words/word-list";
import CreateUser from "../components/users/create-user";
import theme from "../theme";
import { useDispatch } from "react-redux";
import { setAllUsers, setChosenUser } from "../store/slices/user-slice";
import { setAllWords, setAddedWord } from "../store/slices/word-slice";
import store from "../store";
import UserOptions from "../components/users/user-options";

const ApplicationContainer = styled("div")({
  minHeight: "100vh",
  minWidth: "100vw",
  height: "100%",
  width: "100%",
  backgroundColor: theme.palette.secondary.light,
});

const MainPage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    fetch("http://localhost:8080/", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch(
          setAllUsers(
            data.map((user: any) => ({
              firstName: user.first_name,
              lastName: user.last_name,
              id: user._id,
            }))
          )
        )
      );
  });

  const { allWords } = store.getState().words;

  return (
    <ApplicationContainer>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/:id" element={<UserOptions />} />
        <Route path="/cards/:id" element={<WordList allWords={allWords} />} />
      </Routes>
    </ApplicationContainer>
  );
};

export default MainPage;
