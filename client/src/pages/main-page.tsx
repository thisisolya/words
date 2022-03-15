import React from "react";

import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import AddWord from "../components/words/add-word";
import Container from "../shared/container";
import CreateUser from "../components/users/create-user";
import NavBar from "../components/nav-bar";
import UserList from "../components/users/user-list";
import UserOptions from "../components/users/user-options";
import WordList from "../components/words/word-list";

const MainPage = () => {
  return (
    <Container>
      <NavBar />
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/:id" element={<UserOptions />} />
          <Route path="/cards/:id" element={<WordList />} />
          <Route path="/cards/add" element={<AddWord />} />
        </Routes>
      </SnackbarProvider>
    </Container>
  );
};

export default MainPage;
