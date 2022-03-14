import React from "react";
import styled from "@emotion/styled";

import { Link, Route, Routes } from "react-router-dom";
import UserList from "../components/users/user-list";
import WordList from "../components/words/word-list";
import CreateUser from "../components/users/create-user";
import theme from "../theme";
import UserOptions from "../components/users/user-options";
import AddWord from "../components/words/add-word";
import { AppBar } from "@mui/material";

const ApplicationContainer = styled("div")({
  minHeight: "100vh",
  // minWidth: "100vw",
  margin: 0,
  height: "100%",
  // width: "100%",
  backgroundColor: theme.palette.secondary.light,
});

const MainPage = () => {
  return (
    <ApplicationContainer>
      <AppBar>
        <Link to="/">Home</Link>
        <Link to="#">Exit</Link>
      </AppBar>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/:id" element={<UserOptions />} />
        <Route path="/cards/:id" element={<WordList />} />
        <Route path="/cards/add" element={<AddWord />} />
      </Routes>
    </ApplicationContainer>
  );
};

export default MainPage;
