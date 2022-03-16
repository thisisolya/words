import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import Card from "../../shared/card";

interface WordCardProps {
  currentWord: any;
}

const WordCard = ({ currentWord }: WordCardProps) => {
  const [language, setLanguage] = React.useState("russian");
  const wordId = currentWord.wordId;

  const userId =
    useSelector((state: any) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const { enqueueSnackbar } = useSnackbar();

  const handleCardClick = () => {
    setLanguage(language === "russian" ? "english" : "russian");
  };

  const handleWordDelete = () => {
    fetch("http://localhost:8080/cards/delete", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({ userId, wordId }),
    }).then((result) => {
      if (result.status === 200) {
        enqueueSnackbar("Word was sucessfullly deleted!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Something went wrong:(", { variant: "error" });
      }
    });
  };

  const handleWordEdit = () => {};

  return (
    <Card size="large">
      <Typography
        variant="body1"
        marginTop="40px"
        textAlign="center"
        onClick={handleCardClick}
      >
        {currentWord[language]}
      </Typography>
      <Stack flex={2} direction="row" justifyContent="end">
        <IconButton onClick={handleWordDelete}>
          <DeleteOutlineIcon fontSize="small" color="primary" />
        </IconButton>
        <IconButton onClick={handleWordEdit}>
          <EditIcon fontSize="small" color="primary" />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default WordCard;
