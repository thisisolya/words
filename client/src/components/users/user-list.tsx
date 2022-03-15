import React from "react";
import { Button, Grid, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAllUsers, setSelectedUser } from "../../store/slices/user-slice";

import CreateUser from "./create-user";
import UserOptions from "./user-options";

import { User } from "../../types/user";
import theme from "../../theme";

const stackStyle = {
  minHeight: "100px",
  backgroundColor: "white",
  padding: "15px",
  borderRadius: "5px",
  boxShadow: `5px 5px 10px 10px ${theme.palette.secondary.main}`,
};

const UserList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { allUsers, selectedUser } = useSelector((state: any) => state.users);

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    userId
      ? fetch(`http://localhost:8080/user`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrer: "no-referrer",
          body: JSON.stringify({ userId }),
        })
          .then((response) => response.json())
          .then((data) =>
            dispatch(
              setSelectedUser({
                firstName: data[0].first_name,
                lastName: data[0].last_name,
                id: data[0]._id,
              })
            )
          )
      : fetch("http://localhost:8080/", {
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
  }, []);

  React.useEffect(() => {
    selectedUser && navigate(`/user/${selectedUser.id}`);
  }, [selectedUser]);

  const handleClick = (user: User) => {
    localStorage.setItem("userId", user.id);
    dispatch(setSelectedUser(user));
  };

  if (!allUsers && !selectedUser) {
    return <CreateUser />;
  }

  if (selectedUser) {
    return <UserOptions />;
  }

  return (
    <>
      <Typography variant="h2">Who's playing?</Typography>
      <Grid container gap="30px" justifyContent="center" m="20px 30px">
        {allUsers?.map((user: any) => (
          <Stack key={user.id} style={stackStyle} spacing={3}>
            <Typography variant="h3" textAlign="center">
              {user.firstName} {user.lastName}
            </Typography>
            <Button variant="contained" onClick={() => handleClick(user)}>
              Choose this one
            </Button>
          </Stack>
        ))}
      </Grid>
      <Button variant="outlined" onClick={() => navigate("user/create")}>
        Create new user
      </Button>
    </>
  );
};

export default UserList;
