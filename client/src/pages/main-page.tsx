import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import theme from "../theme";

import AddWord from "../components/words/add-word";
import CreateUser from "../components/users/create-user";
import NavBar from "../components/nav-bar";
import UsersList from "../components/users/users-list";
import UserMenu from "../components/users/user-menu";
import WordList from "../components/words/word-list";

const stackStyle = {
  backgroundColor: theme.palette.primary.light,
  height: "100%",
  minHeight: "100vh",
  padding: "10vh 0",
};

const MainPage = () => {
  return (
    <Stack style={stackStyle} direction="column" alignItems="center">
      <NavBar />
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/:id" element={<UserMenu />} />
        <Route path="/cards/:id" element={<WordList />} />
        <Route path="/cards/create" element={<AddWord />} />
      </Routes>
    </Stack>
  );
};

export default MainPage;
