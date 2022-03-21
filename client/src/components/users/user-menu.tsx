import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store";
import { useGetUserInfoQuery } from "../../store/api";
import { setSelectedUser } from "../../store/slice";
import { UserModelFromServer, CardModelFromServer } from "../../types";

import Container from "../../shared/container";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId =
    useSelector((state: AppState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const { selectedUser } = useSelector((state: AppState) => state.users);
  const { data } = useGetUserInfoQuery({ userId });

  React.useEffect(() => {
    data &&
      dispatch(
        setSelectedUser({
          firstName: data.first_name,
          lastName: data.last_name,
          id: data._id,
        })
      );
  }, [data, dispatch]);

  if (!data || !selectedUser) return null;

  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        Welcome, {selectedUser.firstName}!
      </Typography>
      <Typography variant="body1" textAlign="center">
        What would you like to do?
      </Typography>
      <Stack direction="row" spacing={3} justifyContent="center" mt={2}>
        <Button variant="contained" onClick={() => navigate("/cards/create")}>
          Add card
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/cards/${userId}`)}
        >
          Practice
        </Button>
      </Stack>
    </Container>
  );
};

export default UserMenu;
