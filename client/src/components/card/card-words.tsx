import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import { Card as CardType } from '../../types';
import { AppState } from '../../store';
import { useDeleteCardMutation, useEditCardMutation } from '../../store/api';
import useAlert from '../../hooks/use-alert';

import EditableText from '../shared/editable-text';
import Card from '../shared/card';
import CardToolbar from '../shared/card-toolbar';
import useModal from '../../hooks/use-modal';
import { setCurrentCard } from '../../store/slices/card-slice';

interface WordCardProps {
  currentCard: CardType;
  currentCardNumber: number;
}

function ReadonlyText({ text }: { text: string }) {
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
}

function CardWords({
  currentCard,
  currentCardNumber,
}: WordCardProps) {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const [editedFirstWord, setEditedFirstWord] = React.useState(
    currentCard.firstWord,
  );
  const [editedSecondWord, setEditedSecondWord] = React.useState(
    currentCard.secondWord,
  );
  const [editingMode, setEditingMode] = React.useState(false);
  const preferredLanguage = useSelector((state: AppState) => state.card.preferredLanguage);
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);
  const { userId, cardId, ...words } = currentCard;
  const languages = Object.keys(words);

  React.useEffect(() => {
    dispatch(
      setCurrentCard({
        languages: Object.keys(words),
        firstWord: Object.values(words)[0],
        secondWord: Object.values(words)[1],
      }),
    );
  }, [currentCard]);

  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage, currentCardNumber]);

  const handleModeChange = () => {
    setEditingMode(!editingMode);
    setEditedFirstWord(currentCard.firstWord);
    setEditedSecondWord(currentCard.secondWord);
  };

  React.useEffect(() => {
    if (editResult) {
      if (editResult.modifiedCount === 1) {
        showAlert({
          text: 'Word was sucessfullly edited!',
          severity: 'success',
        });
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
    }
  }, [editResult]);

  React.useEffect(() => {
    if (deleteResult) {
      if (deleteResult.deletedCount === 1) {
        showAlert({
          text: 'Word was sucessfullly deleted!',
          severity: 'success',
        });
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
    }
  }, [deleteResult]);

  const deleteCardFunction = () => {
    deleteCard({ userId, cardId: currentCard.cardId }).unwrap();
  };

  const handleCardDelete = () => {
    showModal({
      text: ' This is going to delete this card forever. There is no possibility to restore deleted cards',
      acceptFunction: () => deleteCardFunction,
    });
  };

  const handleCardEdit = () => {
    editCard({
      userId,
      [languages[0]]: editedFirstWord,
      [languages[1]]: editedSecondWord,
      cardId,
    }).unwrap();
    handleModeChange();
  };

  const editableObjects = [
    {
      id: React.useId(),
      setNewValue: setEditedFirstWord,
      value: editedFirstWord,
    },
    {
      id: React.useId(),
      setNewValue: setEditedSecondWord,
      value: editedSecondWord,
    },
  ];

  return (
    <Card size="large">
      <Stack
        flex={10}
        onClick={() => setCurrentLanguage(
          currentLanguage === languages[0] ? languages[1] : languages[0],
        )}
        justifyContent="center"
      >
        {editingMode ? (
          editableObjects.map((object) => (
            <EditableText
              key={object.id}
              value={object.value}
              setNewValue={object.setNewValue}
            />
          ))
        ) : (
          <ReadonlyText
            text={currentCard[currentLanguage as keyof CardType]}
          />
        )}
      </Stack>
      <CardToolbar
        handleCardDelete={() => handleCardDelete()}
        handleModeChange={handleModeChange}
        handleCardEdit={handleCardEdit}
        editingMode={editingMode}
      />
    </Card>
  );
}

export default CardWords;
