import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import theme from "../theme";

import CreateCard from "./create-card";
import CreateUser from "./create-user";
import NavBar from "../components/nav-bar";
import UsersList from "./users-list";
import UserMenu from "./user-menu";
import CardsList from "./cards-list";

const stackStyle = {
  backgroundColor: theme.palette.primary.light,
  height: "100%",
  minHeight: "100vh",
  padding: "10vh 0",
  overflow: "hidden",
};

const MainPage = () => {
  return (
    <Stack style={stackStyle} direction="column" alignItems="center">
      <NavBar />
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:id" element={<UserMenu />} />
        <Route path="/cards/:id" element={<CardsList />} />
        <Route path="/cards/create" element={<CreateCard />} />
        <Route path="/user/create" element={<CreateUser />} />
      </Routes>
    </Stack>
  );
};

export default MainPage;
