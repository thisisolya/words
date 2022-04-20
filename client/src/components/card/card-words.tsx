import React from 'react';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';

import { useDeleteCardMutation, useEditCardMutation } from '../../store/apis/card-api';
import { editedCardSelector } from '../../store/selectors/cards';
import { AppState } from '../../store';
import { Card as CardType } from '../../types';
import useModal from '../../hooks/use-modal';
import useAlert from '../../hooks/use-alert';

import Card from '../shared/card';
import CardToolbar from '../shared/card-toolbar';
import EditableWords from './editable-words';
import ReadonlyWords from './readonly-words';

interface WordCardProps {
  currentCard: CardType;
  currentCardNumber: number;
}

function CardWords({
  currentCard,
  currentCardNumber,
}: WordCardProps) {
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const { preferredLanguage, selectedLanguages } = useSelector((state: AppState) => state.card);
  const [editingMode, setEditingMode] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);

  const { userId, cardId, ...words } = currentCard;
  const firstWord = words[selectedLanguages[0] as keyof typeof words];
  const secondWord = words[selectedLanguages[1] as keyof typeof words];
  const {
    firstWord: firstWordEdited,
    secondWord: secondWordEdited,
  } = useSelector(editedCardSelector) || {};

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage, currentCard]);

  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();

  const toggleLanguage = () => setCurrentLanguage(
    currentLanguage === selectedLanguages[0]
      ? selectedLanguages[1]
      : selectedLanguages[0],
  );

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage, currentCardNumber]);

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
      [selectedLanguages[0]]: firstWordEdited || firstWord,
      [selectedLanguages[1]]: secondWordEdited || secondWord,
      cardId,
    }).unwrap();
    setEditingMode(!editingMode);
  };

  const editableObjects = [
    {
      value: firstWord,
      language: selectedLanguages[0],
      index: 'first',
    },
    {
      value: secondWord,
      language: selectedLanguages[1],
      index: 'second',
    },
  ];

  return (
    <Card size="large">
      <Stack
        flex={10}
        onClick={toggleLanguage}
        justifyContent="center"
      >
        {editingMode ? (
          <EditableWords editableObjects={editableObjects} />
        ) : (
          <ReadonlyWords
            text={currentCard[currentLanguage as keyof CardType]}
          />
        )}
      </Stack>
      <CardToolbar
        handleCardDelete={() => handleCardDelete()}
        handleModeChange={() => setEditingMode(!editingMode)}
        handleCardEdit={handleCardEdit}
        editingMode={editingMode}
      />
    </Card>
  );
}

export default CardWords;
