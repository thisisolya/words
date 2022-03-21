import React from "react";
import { Button, IconButton, Stack, Switch, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { AnimatePresence, motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppState } from "../../store";

import WordCard from "./word-card";
import Container from "../../shared/container";
import { CardModelFromServer } from "../../types";
import { setSelectedUser } from "../../store/slice";
import { useGetAllCardsQuery } from "../../store/api";

const CardsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId =
    useSelector((state: AppState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const { selectedUser } = useSelector((state: AppState) => state.users);
  const cards = selectedUser?.cards;

  const [currentCard, setCurrentCard] = React.useState(0);
  const [language, setLanguage] = React.useState("russian");
  const [paginateForwards, setPaginateForwards] = React.useState(true);

  const transitionInitialValue = paginateForwards ? "100%" : "-100%";
  const transitionExitValue = paginateForwards ? "-100%" : "100%";

  const lastWord = cards && currentCard === cards.length - 1;
  const firstWord = currentCard === 0;

  const toggleLanguage = () => {
    setLanguage(language === "russian" ? "english" : "russian");
  };

  const handlePagination = (direction: number) => {
    setCurrentCard(currentCard + direction);
    setPaginateForwards(direction === 1 ? true : false);
  };

  const { data } = useGetAllCardsQuery({ userId });

  React.useEffect(() => {
    data &&
      dispatch(
        setSelectedUser({
          cards: data.map((card: CardModelFromServer) => ({
            english: card.english,
            russian: card.russian,
            userId: card.user_id,
            cardId: card._id,
          })),
        })
      );
  }, [data, dispatch]);

  if (!cards || cards.length === 0) {
    return (
      <Container>
        <Stack spacing={3}>
          <Typography variant="body1">
            You have no cards yet. Woud you like to add some?
          </Typography>
          <Button variant="contained" onClick={() => navigate("/cards/create")}>
            Create card
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
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
                currentCard={cards[currentCard]}
                language={language}
                currentCardNumber={currentCard}
                setCurrentCardNumber={setCurrentCard}
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
    </Container>
  );
};

export default CardsList;
