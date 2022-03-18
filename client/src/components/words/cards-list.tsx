import React from "react";
import { Button, IconButton, Stack, Switch, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { AnimatePresence, motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAllCards } from "../../store/slices/cards-slice";
import { RootState } from "../../store";
import { getAllCardsByUserId } from "../../fetch/getAllCardsByUserId";

import WordCard from "./word-card";
import Container from "../../shared/container";

const CardsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId =
    useSelector((state: RootState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");
  const { allCards } = useSelector((state: RootState) => state.words);

  const [currentCard, setCurrentCard] = React.useState(0);
  const [refetchNeeded, setRefetchNeeded] = React.useState(false);
  const [language, setLanguage] = React.useState("russian");
  const [paginateForwards, setPaginateForwards] = React.useState(true);

  const transitionInitialValue = paginateForwards ? "100%" : "-100%";
  const transitionExitValue = paginateForwards ? "-100%" : "100%";

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
    setRefetchNeeded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchNeeded, userId]);

  const toggleLanguage = () => {
    setLanguage(language === "russian" ? "english" : "russian");
  };

  const handlePagination = (direction: number) => {
    setCurrentCard(currentCard + direction);
    setPaginateForwards(direction === 1 ? true : false);
  };

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
    <>
      <Stack direction="row" alignItems="center">
        <Typography>Russian first</Typography>
        <Switch color="info" onChange={toggleLanguage} />
        <Typography>English first</Typography>
      </Stack>

      <Stack direction="row" alignItems="center">
        <IconButton disabled={firstWord} onClick={() => handlePagination(-1)}>
          <ArrowBackIosIcon color={firstWord ? "disabled" : "primary"} />
        </IconButton>
        <AnimatePresence initial={false}>
          <div style={{ overflow: "hidden" }}>
            <motion.div
              key={currentCard}
              initial={{ x: transitionInitialValue, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: transitionExitValue, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WordCard
                currentCard={allCards[currentCard]}
                language={language}
                currentCardNumber={currentCard}
                setCurrentCardNumber={setCurrentCard}
                setRefetchNeeded={setRefetchNeeded}
              />
            </motion.div>
          </div>
        </AnimatePresence>
        <IconButton disabled={lastWord} onClick={() => handlePagination(1)}>
          <ArrowForwardIosIcon color={lastWord ? "disabled" : "primary"} />
        </IconButton>
      </Stack>
      <Button variant="contained" onClick={() => navigate("/cards/create")}>
        Create card
      </Button>
    </>
  );
};

export default CardsList;
