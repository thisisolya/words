import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import Card from "../../shared/card";
import CardToolbar from "../../shared/card-toolbar";
import { Card as CardType } from "../../types/cards";
import EditText from "../../shared/edit-text";
import { RootState } from "../../store";
import { editCard } from "../../fetch/editCard";
import { deleteCard } from "../../fetch/deleteCard";

interface WordCardProps {
  currentCard: CardType;
  setRefetchNeeded: React.Dispatch<React.SetStateAction<boolean>>;
}

const WordCard = ({ currentCard, setRefetchNeeded }: WordCardProps) => {
  const [language, setLanguage] = React.useState("russian");
  const [editedRussianWord, setEditedRussianWord] = React.useState(
    currentCard.russian
  );
  const [editedEnglishWord, setEditedEnglishWord] = React.useState(
    currentCard.english
  );
  const [editingMode, setEditingMode] = React.useState(false);

  const cardId = currentCard.cardId;

  const userId =
    useSelector((state: RootState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const { enqueueSnackbar } = useSnackbar();

  const handleCardClick = () => {
    !editingMode && setLanguage(language === "russian" ? "english" : "russian");
  };

  const handleCardDelete = () => {
    deleteCard({ userId, cardId }).then((result) => {
      if (result.status === 200) {
        enqueueSnackbar("Word was sucessfullly deleted!", {
          variant: "success",
        });
        setRefetchNeeded(true);
      } else {
        enqueueSnackbar("Something went wrong:(", { variant: "error" });
      }
    });
  };

  const handlCardEdit = () => {
    editCard({ editedEnglishWord, editedRussianWord, userId, cardId }).then(
      (result) => {
        if (result.status === 200) {
          enqueueSnackbar("Word was sucessfullly edited!", {
            variant: "success",
          });
          setRefetchNeeded(true);
        } else {
          enqueueSnackbar("Something went wrong:(", { variant: "error" });
        }
      }
    );
    handleModeChange();
  };

  const handleModeChange = () => {
    setEditingMode(!editingMode);
    if (editingMode) {
      setEditedEnglishWord(currentCard.english);
      setEditedRussianWord(currentCard.russian);
    }
  };

  const editableObjects = [
    { value: editedRussianWord, setNewValue: setEditedRussianWord },
    { value: editedEnglishWord, setNewValue: setEditedEnglishWord },
  ];

  return (
    <Card size="large">
      <Stack flex={10} onClick={handleCardClick} justifyContent="center">
        {editingMode ? (
          <EditText objectsToEdit={editableObjects} />
        ) : (
          <Typography variant="body1" textAlign="center">
            {currentCard[language as keyof CardType]}
          </Typography>
        )}
      </Stack>

      <CardToolbar
        handleWordDelete={handleCardDelete}
        handleModeChange={handleModeChange}
        handleWordEdit={handlCardEdit}
        editingMode={editingMode}
      />
    </Card>
  );
};

export default WordCard;
