import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { AnimatePresence, motion } from "framer-motion";

import { RootState } from "../../store";
import { editCard } from "../../fetch/editCard";
import { deleteCard } from "../../fetch/deleteCard";

import { Card as CardType } from "../../types/cards";

import EditText from "../../shared/edit-text";
import Card from "../../shared/card";
import CardToolbar from "../../shared/card-toolbar";

interface WordCardProps {
  currentCard: CardType;
  currentCardNumber: number;
  setCurrentCardNumber: React.Dispatch<React.SetStateAction<number>>;
  setRefetchNeeded: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
}

const ReadText = ({ text }: { text: string }) => {
  return (
    <AnimatePresence>
      <Typography
        key={text}
        fontWeight="600"
        textAlign="center"
        component={motion.p}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </Typography>
    </AnimatePresence>
  );
};

const WordCard = ({
  currentCard,
  language,
  currentCardNumber,
  setCurrentCardNumber,
  setRefetchNeeded,
}: WordCardProps) => {
  const userId =
    useSelector((state: RootState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");
  const { enqueueSnackbar } = useSnackbar();

  const [editedRussianWord, setEditedRussianWord] = React.useState(
    currentCard.russian
  );
  const [editedEnglishWord, setEditedEnglishWord] = React.useState(
    currentCard.english
  );
  const [editingMode, setEditingMode] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState("");
  const cardId = currentCard.cardId;

  React.useEffect(() => {
    setCurrentLanguage(language);
  }, [language, currentCardNumber]);

  const handleCardDelete = () => {
    deleteCard({ userId, cardId })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          enqueueSnackbar("Word was sucessfullly deleted!", {
            variant: "success",
          });
          setRefetchNeeded(true);
          currentCardNumber > 0 && setCurrentCardNumber(currentCardNumber - 1);
        } else {
          enqueueSnackbar("Something went wrong:(", { variant: "error" });
        }
      });
  };

  const handleCardEdit = () => {
    editCard({ editedEnglishWord, editedRussianWord, userId, cardId })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          enqueueSnackbar("Word was sucessfullly edited!", {
            variant: "success",
          });
          setRefetchNeeded(true);
        } else {
          enqueueSnackbar("Something went wrong:(", { variant: "error" });
        }
      });
    handleModeChange();
  };

  const handleModeChange = () => {
    setEditingMode(!editingMode);
    setEditedEnglishWord(currentCard.english);
    setEditedRussianWord(currentCard.russian);
  };

  const editableObjects = [
    {
      value: editedEnglishWord,
      setNewValue: setEditedEnglishWord,
    },
    {
      value: editedRussianWord,
      setNewValue: setEditedRussianWord,
    },
  ];

  return (
    <Card size="large" key={currentCardNumber}>
      <Stack
        flex={10}
        onClick={() =>
          setCurrentLanguage(
            currentLanguage === "russian" ? "english" : "russian"
          )
        }
        justifyContent="center"
      >
        {editingMode ? (
          <EditText objectsToEdit={editableObjects} />
        ) : (
          <ReadText text={currentCard[currentLanguage as keyof CardType]} />
        )}
      </Stack>
      <CardToolbar
        handleCardDelete={handleCardDelete}
        handleModeChange={handleModeChange}
        handleCardEdit={handleCardEdit}
        editingMode={editingMode}
      />
    </Card>
  );
};

export default WordCard;
