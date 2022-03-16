import React from "react";
import { Button, Typography, Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useFetch from "../../hooks/use-fetch";
import { setAllUsers } from "../../store/slices/user-slice";
import { RootState } from "../../store";

import CreateUser from "./create-user";
import UserMenu from "./user-menu";
import UserCard from "./user-card";

const UsersList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { allUsers, selectedUser } = useSelector(
    (state: RootState) => state.users
  );
  const userId = localStorage.getItem("userId");

  const allUsersData = useFetch({
    endpoint: "http://localhost:8080/",
    method: "GET",
  });

  React.useEffect(() => {
    allUsersData &&
      dispatch(
        setAllUsers(
          allUsersData.map((user: any) => ({
            firstName: user.first_name,
            lastName: user.last_name,
            id: user._id,
          }))
        )
      );
  }, [allUsersData, dispatch]);

  if (!allUsers && !selectedUser) {
    return <CreateUser />;
  }

  if (userId) {
    return <UserMenu />;
  }

  return (
    <Stack justifyContent="center" alignItems="center" spacing={3}>
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
    </Stack>
  );
};

export default UsersList;
