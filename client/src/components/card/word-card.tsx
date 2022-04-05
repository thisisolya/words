import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import { Card as CardType } from '../../types';
import { AppState } from '../../store';
import { useDeleteCardMutation, useEditCardMutation } from '../../store/api';
import useAlert from '../../hooks/use-alert';

import EditableText from '../shared/editable-text';
import Card from '../shared/card';
import CardToolbar from '../shared/card-toolbar';
import useModal from '../../hooks/use-modal';

interface WordCardProps {
  currentCard: CardType;
  currentCardNumber: number;
  setCurrentCardNumber: React.Dispatch<React.SetStateAction<number>>;
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

function WordCard({
  currentCard,
  currentCardNumber,
  setCurrentCardNumber,
}: WordCardProps) {
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const [editedRussianWord, setEditedRussianWord] = React.useState(
    currentCard.russian,
  );
  const [editedEnglishWord, setEditedEnglishWord] = React.useState(
    currentCard.english,
  );

  const [editingMode, setEditingMode] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState('');

  const userId = useSelector((state: AppState) => state.users.selectedUser?.id)
    || localStorage.getItem('userId');
  const preferredLanguage = useSelector((state: AppState) => state.users.preferredLanguage);

  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage, currentCardNumber]);

  const handleModeChange = () => {
    setEditingMode(!editingMode);
    setEditedEnglishWord(currentCard.english);
    setEditedRussianWord(currentCard.russian);
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
        if (currentCardNumber > 0) {
          setCurrentCardNumber(currentCardNumber - 1);
        }
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
      userId, editedEnglishWord, editedRussianWord, cardId: currentCard.cardId,
    }).unwrap();
    handleModeChange();
  };

  const editableObjects = [
    {
      id: React.useId(),
      setNewValue: setEditedEnglishWord,
      value: editedEnglishWord,
    },
    {
      id: React.useId(),
      setNewValue: setEditedRussianWord,
      value: editedRussianWord,
    },
  ];

  return (
    <Card size="large">
      <Stack
        flex={10}
        onClick={() => setCurrentLanguage(
          currentLanguage === 'russian' ? 'english' : 'russian',
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

export default WordCard;
