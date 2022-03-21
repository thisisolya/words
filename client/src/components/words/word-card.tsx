import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { AnimatePresence, motion } from "framer-motion";

import { Card as CardType } from "../../types";
import { AppState } from "../../store";
import { useDeleteCardMutation, useEditCardMutation } from "../../store/api";

import EditText from "../../shared/edit-text";
import Card from "../../shared/card";
import CardToolbar from "../../shared/card-toolbar";

interface WordCardProps {
  currentCard: CardType;
  currentCardNumber: number;
  setCurrentCardNumber: React.Dispatch<React.SetStateAction<number>>;
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
}: WordCardProps) => {
  const [editedRussianWord, setEditedRussianWord] = React.useState(
    currentCard.russian
  );
  const [editedEnglishWord, setEditedEnglishWord] = React.useState(
    currentCard.english
  );
  const [editingMode, setEditingMode] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState("");
  const userId =
    useSelector((state: AppState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const { enqueueSnackbar } = useSnackbar();
  const cardId = currentCard.cardId;

  React.useEffect(() => {
    setCurrentLanguage(language);
  }, [language, currentCardNumber]);

  const [deleteCard] = useDeleteCardMutation();
  const [editCard] = useEditCardMutation();

  const handleCardDelete = () => {
    deleteCard({ userId, cardId }).then((result: any) => {
      if (result.data.deletedCount === 1) {
        enqueueSnackbar("Word was sucessfullly deleted!", {
          variant: "success",
        });
        currentCardNumber > 0 && setCurrentCardNumber(currentCardNumber - 1);
      } else {
        enqueueSnackbar("Something went wrong:(", { variant: "error" });
      }
    });
  };

  const handleCardEdit = () => {
    editCard({ userId, editedEnglishWord, editedRussianWord, cardId }).then(
      (result: any) => {
        if (result.data.modifiedCount === 1) {
          enqueueSnackbar("Word was sucessfullly edited!", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Something went wrong:(", { variant: "error" });
        }
      }
    );
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
