import { Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllWords } from "../../store/slices/word-slice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/use-fetch";
import WordCard from "./word-card";
import theme from "../../theme";

const WordList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId =
    useSelector((state: any) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const { allWords } = useSelector((state: any) => state.words);
  const [currentWord, setCurrentWord] = React.useState(0);

  const lastWord = allWords ? currentWord === allWords.length - 1 : false;
  const firstWord = currentWord === 0;

  const wordsList = useFetch({
    endpoint: "http://localhost:8080/cards",
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  React.useEffect(() => {
    wordsList &&
      wordsList.length &&
      dispatch(
        setAllWords(
          wordsList.map((word: any) => ({
            english: word.english,
            russian: word.russian,
            userId: word.user_id,
            wordId: word._id,
          }))
        )
      );
  }, [wordsList, dispatch]);

  const handleBackClick = () => {
    if (firstWord) return;
    setCurrentWord((currentWord) => currentWord - 1);
  };

  const handleForwardClick = () => {
    if (lastWord) return;
    setCurrentWord((currentWord) => currentWord + 1);
  };

  if (!allWords || !allWords.length) {
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
        <WordCard currentWord={allWords[currentWord]} />
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

export default WordList;
