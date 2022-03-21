import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store";
import { setAllUsers } from "../../store/slice";
import { useGetAllUsersQuery } from "../../store/api";

import CreateUser from "./create-user";
import UserMenu from "./user-menu";
import UserCard from "./user-card";
import Container from "../../shared/container";
import { User, UserModelFromServer } from "../../types";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { allUsers } = useSelector((state: AppState) => state.users);

  const { data } = useGetAllUsersQuery("/");

  React.useEffect(() => {
    data &&
      dispatch(
        setAllUsers(
          data.map((user: UserModelFromServer) => ({
            firstName: user.first_name,
            lastName: user.last_name,
            id: user._id,
          }))
        )
      );
  }, [data, dispatch]);

  if (!data || !allUsers) {
    return <CreateUser />;
  }

  if (userId) {
    return <UserMenu />;
  }

  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        Who's playing?
      </Typography>
      <Grid container gap="15px" justifyContent="center" mt="20px">
        {allUsers!.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Grid>
      <Button variant="contained" onClick={() => navigate("user/create")}>
        Create new user
      </Button>
    </Container>
  );
};

export default UsersList;
