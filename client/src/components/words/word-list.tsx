import { Card, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../shared/container";
import { setAllWords } from "../../store/slices/word-slice";

interface WordListProps {
  allWords?: {
    ru: string;
    eng: string;
  }[];
}

const WordList = () => {
  const dispatch = useDispatch();
  const userId =
    useSelector((state: any) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");
  const { allWords } = useSelector((state: any) => state.words);
  const [currentWord, setCurrentWord] = React.useState(0);
  const cardRef = React.useRef<any>();

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

  const handleClick = (e: any) => {
    console.log(currentWord);
    if (currentWord === 0) {
      e.pageY > 150
        ? setCurrentWord((currentWord) => currentWord + 1)
        : setCurrentWord(currentWord);
    }
    if (currentWord > 0) {
      e.pageY > 150
        ? setCurrentWord((currentWord) => currentWord + 1)
        : setCurrentWord((currentWord) => currentWord - 1);
    }
    if (currentWord === allWords.length - 1) {
      e.pageY > 150
        ? setCurrentWord(currentWord)
        : setCurrentWord((currentWord) => currentWord - 1);
    }
  };

  if (!allWords) {
    return null;
  }

  return (
    <Container>
      <Card
        key={allWords[currentWord].russian}
        onClick={handleClick}
        ref={cardRef}
      >
        <Typography variant="body1">{allWords[currentWord].english}</Typography>
      </Card>
    </Container>
  );
};

export default WordList;
