import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAllUsers } from "../../store/slices/users-slice";
import { RootState } from "../../store";
import { getAllUsers } from "../../fetch/getAllUsers";

import CreateUser from "./create-user";
import UserMenu from "./user-menu";
import UserCard from "./user-card";
import Container from "../../shared/container";

const UsersList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { allUsers, selectedUser } = useSelector(
    (state: RootState) => state.users
  );
  const userId = localStorage.getItem("userId");

  React.useEffect(() => {
    getAllUsers()
      .then((res) => res.json())
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
  }, [dispatch]);

  if (!allUsers && !selectedUser) {
    return <CreateUser />;
  }

  if (userId) {
    return <UserMenu />;
  }

  return (
    <>
      <Typography variant="h2" textAlign="center">
        Who's playing?
      </Typography>
      <Grid container gap="15px" justifyContent="center" mt="20px">
        {allUsers!.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Grid>
      <Button variant="contained" onClick={() => navigate("user/create")}>
        Create new user
      </Button>
    </>
  );
};

export default UsersList;
