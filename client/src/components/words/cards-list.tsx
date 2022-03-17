import { Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCards } from "../../store/slices/cards-slice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import WordCard from "./word-card";
import { RootState } from "../../store";
import { getAllCardsByUserId } from "../../fetch/getAllCardsByUserId";

const CardsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId =
    useSelector((state: RootState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");
  const { allCards } = useSelector((state: RootState) => state.words);

  const [currentCard, setCurrentCard] = React.useState(0);
  const [refetchNeeded, setRefetchNeeded] = React.useState(false);

  const lastWord = allCards ? currentCard === allCards.length - 1 : false;
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

  const handleBackClick = () => {
    if (firstWord) return;
    setCurrentCard((currentCard) => currentCard - 1);
  };

  const handleForwardClick = () => {
    if (lastWord) return;
    setCurrentCard((currentCard) => currentCard + 1);
  };

  if (!allCards || !allCards.length) {
    return (
      <>
        <Typography variant="body1">
          You have no words yet. Woud you like to add some?
        </Typography>
        <Button variant="contained" onClick={() => navigate("/cards/create")}>
          add a new word
        </Button>
      </>
    );
  }

  return (
    <Stack direction="column" alignItems="center" spacing={3}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton disabled={firstWord} onClick={handleBackClick}>
          <ArrowBackIosIcon />
        </IconButton>
        <WordCard
          currentCard={allCards[currentCard]}
          setRefetchNeeded={setRefetchNeeded}
        />
        <IconButton disabled={lastWord} onClick={handleForwardClick}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
      <Button variant="outlined" onClick={() => navigate("/cards/create")}>
        add a new word
      </Button>
    </Stack>
  );
};

export default CardsList;
