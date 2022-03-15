import { Button, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../shared/container";
import { setAllWords } from "../../store/slices/word-slice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const WordList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId =
    useSelector((state: any) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const { allWords } = useSelector((state: any) => state.words);
  const [currentWord, setCurrentWord] = React.useState(0);
  const [language, setLanguage] = React.useState("russian");

  const lastWord = allWords ? currentWord === allWords.length - 1 : 0;
  const firstWord = currentWord === 0;

  React.useEffect(() => {
    fetch(`http://localhost:8080/cards`, {
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
          setAllWords(
            data.map((word: any) => ({
              english: word.english,
              russian: word.russian,
              userId: word.user_id,
            }))
          )
        )
      );
  }, []);

  const handleCardClick = () => {
    setLanguage(language === "russian" ? "english" : "russian");
  };

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
        <Typography variant="body1" textAlign="center">
          You have no words yet. Woud you like to add some?
        </Typography>
        <Button variant="contained" onClick={() => navigate("/cards/add")}>
          add a new word
        </Button>
      </>
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <ArrowBackIosIcon
        color={firstWord ? "secondary" : "primary"}
        onClick={handleBackClick}
      />
      <Card key={allWords[currentWord].russian} onClick={handleCardClick}>
        <Typography variant="body1">
          {allWords[currentWord][language]}
        </Typography>
      </Card>
      <ArrowForwardIosIcon
        color={lastWord ? "secondary" : "primary"}
        onClick={handleForwardClick}
      />
    </Stack>
  );
};

export default WordList;
