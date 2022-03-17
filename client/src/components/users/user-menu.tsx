import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedUser } from "../../store/slices/users-slice";
import { RootState } from "../../store";
import { getUserInfo } from "../../fetch/getUserInfo";
import { setAllCards } from "../../store/slices/cards-slice";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId =
    useSelector((state: RootState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const firstName = useSelector(
    (state: RootState) => state.users.selectedUser?.firstName
  );

  React.useEffect(() => {
    userId &&
      getUserInfo(userId).then((result: Response) =>
        result.json().then((data) => {
          console.log(data);
          dispatch(
            setSelectedUser({
              firstName: data[0].first_name,
              lastName: data[0].last_name,
              id: data[0]._id,
            })
          );
          dispatch(
            setAllCards(
              data[0].cards.map((card: any) => ({
                english: card.english,
                russian: card.russian,
                userId: card.user_id,
                cardId: card._id,
              }))
            )
          );
        })
      );
  }, [userId, dispatch]);

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
