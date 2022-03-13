import React from "react";
import { Grid, Typography } from "@mui/material";
import store from "../../store";
import WordList from "../words/word-list";
import CreateUser from "./create-user";
import Container from "../../shared/container";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAllUsers, setChosenUser } from "../../store/slices/user-slice";
import { User } from "../../types/user";

type UserListProps = {
  selectedUser?: User;
  allUsers?: User[];
};

const UserList = () => {
  // const { allUsers, selectedUser }: UserListProps = store.getState().users;
  let navigate = useNavigate();

  const allUsers = React.useState(store.getState().users.allUsers);
  const selectedUser = React.useState(store.getState().users.selectedUser);

  const handleClick = (id: string) => {
    navigate(`/user/${id}`);
  };

  if (!allUsers && !selectedUser) {
    return <CreateUser />;
  }

  if (selectedUser) {
    return <WordList />;
  }

  return (
    <Container>
      <Typography variant="h2">Who's playing?</Typography>
      <Grid container gap="30px" justifyContent={"center"} m="20px 30px">
        {allUsers?.map(
          (user) => "slslsl"
          // <Grid item onClick={() => handleClick(user?.id)}>
          //   {user?.firstName} {user?.lastName}
          // </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default UserList;
