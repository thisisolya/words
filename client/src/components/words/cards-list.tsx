import React from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAllCards } from "../../store/slices/cards-slice";
import { RootState } from "../../store";
import { getAllCardsByUserId } from "../../fetch/getAllCardsByUserId";

import WordCard from "./word-card";

const CardsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId =
    useSelector((state: RootState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");
  const { allCards } = useSelector((state: RootState) => state.words);

  const [currentCard, setCurrentCard] = React.useState(0);
  const [refetchNeeded, setRefetchNeeded] = React.useState(false);

  const lastWord = allCards && currentCard === allCards.length - 1;
  const firstWord = currentCard === 0;

  React.useEffect(() => {
    if (!allCards || allCards.length < 1 || refetchNeeded) {
      getAllCardsByUserId(userId!)
        .then((res) => res.json())
        .then((data) =>
          dispatch(
            setAllCards(
              data.map((card: any) => ({
                english: card.english,
                russian: card.russian,
                userId: card.user_id,
                cardId: card._id,
              }))
            )
          )
        );
    }
  }, [refetchNeeded, userId]);

  if (!allCards || !allCards.length) {
    return (
      <Stack spacing={3}>
        <Typography variant="body1">
          You have no cards yet. Woud you like to add some?
        </Typography>
        <Button variant="contained" onClick={() => navigate("/cards/create")}>
          Create card
        </Button>
      </Stack>
    );
  }

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Stack direction="row" alignItems="center">
        <IconButton
          disabled={firstWord}
          onClick={() => setCurrentCard(currentCard - 1)}
        >
          <ArrowBackIosIcon color={firstWord ? "disabled" : "primary"} />
        </IconButton>
        <WordCard
          currentCard={allCards[currentCard]}
          setRefetchNeeded={setRefetchNeeded}
        />
        <IconButton
          disabled={lastWord}
          onClick={() => setCurrentCard(currentCard + 1)}
        >
          <ArrowForwardIosIcon color={lastWord ? "disabled" : "primary"} />
        </IconButton>
      </Stack>
      <Button variant="contained" onClick={() => navigate("/cards/create")}>
        Create card
      </Button>
    </Stack>
  );
};

export default CardsList;
