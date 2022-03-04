import React from "react";
import styled from "@emotion/styled";

import { Route, Routes } from "react-router-dom";
import UserList from "../components/users/user-list";
import WordList from "../components/words/word-list";
import CreateUser from "../components/users/create-user";

const ApplicationContainer = styled("div")({
  minHeight: "100vh",
  minWidth: "100vw",
  height: "100%",
  width: "100%",
  backgroundColor: "rgba(219, 255, 223, 0.8)",
});

const MainPage = () => {
  return (
    <ApplicationContainer>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/cards" element={<WordList />} />
      </Routes>
    </ApplicationContainer>
  );
};

export default MainPage;
