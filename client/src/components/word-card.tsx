import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { Card as CardType } from '../types';
import { AppState } from '../store';
import { useDeleteCardMutation, useEditCardMutation } from '../store/api';
import useAlert from '../hooks/use-alert';

import EditableText from './shared/editable-text';
import Card from './shared/card';
import CardToolbar from './shared/card-toolbar';
import useModal from '../hooks/use-modal';

interface WordCardProps {
  currentCard: CardType;
  currentCardNumber: number;
  setCurrentCardNumber: React.Dispatch<React.SetStateAction<number>>;
  language: string;
  transitionInitialValue: string;
  transitionExitValue: string;
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
  language,
  currentCardNumber,
  setCurrentCardNumber,
  transitionInitialValue,
  transitionExitValue,
}: WordCardProps) {
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

  const { cardId } = currentCard;

  React.useEffect(() => {
    setCurrentLanguage(language);
  }, [language, currentCardNumber]);

  const { showAlert } = useAlert();
  const { showModal } = useModal();
  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();

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

  const deleteUserFunction = () => {
    deleteCard({ userId, cardId }).unwrap();
  };

  const handleCardDelete = () => {
    showModal({
      text: ' This is going to delete this card forever. There is no possibility to restore deleted cards',
      acceptFunction: () => deleteUserFunction,
    });
  };

  const handleCardEdit = () => {
    editCard({
      userId, editedEnglishWord, editedRussianWord, cardId,
    }).unwrap();
    handleModeChange();
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
    <AnimatePresence>
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          key={currentCard.cardId}
          initial={{ x: transitionInitialValue, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: transitionExitValue, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card size="large">
            <Stack
              flex={10}
              onClick={() => setCurrentLanguage(
                currentLanguage === 'russian' ? 'english' : 'russian',
              )}
              justifyContent="center"
            >
              {editingMode ? (
                editableObjects.map((object, index) => (
                  <EditableText
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default WordCard;
