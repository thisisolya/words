import React from "react";
import Container from "../../shared/container";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Typography, Stack } from "@mui/material";

const UserOptions = () => {
  const navigate = useNavigate();

  const userId =
    useSelector((state: any) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");
  const { firstName } = useSelector((state: any) => state.users.selectedUser);

  if (!userId) return null;

  return (
    <>
      <Typography variant="h3">Welcome, {firstName}!</Typography>
      <Typography variant="body1">What would you like to do?</Typography>
      <Stack direction="row" spacing={3}>
        <Button variant="contained" onClick={() => navigate("/cards/add")}>
          add a new word
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/cards/${userId}`)}
        >
          practice existing words
        </Button>
      </Stack>
    </>
  );
};

export default UserOptions;
