import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useFetch from "../../hooks/use-fetch";
import { setSelectedUser } from "../../store/slices/user-slice";
import { RootState } from "../../store";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId =
    useSelector((state: RootState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const firstName = useSelector(
    (state: RootState) => state.users.selectedUser?.firstName
  );

  const userData = useFetch({
    endpoint: "http://localhost:8080/user",
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  React.useEffect(() => {
    userData &&
      dispatch(
        setSelectedUser({
          firstName: userData.first_name,
          lastName: userData.last_name,
          userId: userData._id,
        })
      );
  }, [userData, dispatch]);

  if (!firstName) return null;

  return (
    <>
      <Typography variant="h3" textAlign="center">
        Welcome, {firstName}!
      </Typography>
      <Typography variant="body1" textAlign="center">
        What would you like to do?
      </Typography>
      <Stack direction="row" spacing={3} justifyContent="center" mt={2}>
        <Button variant="contained" onClick={() => navigate("/cards/create")}>
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

export default UserMenu;
