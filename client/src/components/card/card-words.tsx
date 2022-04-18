import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import { Card as CardType } from '../../types';
import { AppState } from '../../store';
import { useDeleteCardMutation, useEditCardMutation } from '../../store/api';
import useAlert from '../../hooks/use-alert';

import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';

import Card from '../shared/card';
import CardToolbar from '../shared/card-toolbar';
import useModal from '../../hooks/use-modal';
import { setEditedCard } from '../../store/slices/card-slice';
import Autocomplete from '../autocomplete';
import LanguageSelector from './language-selector';

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
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const firstWordEdited = useSelector((state: AppState) => state.card.editedCard.firstWord);
  const secondWordEdited = useSelector((state: AppState) => state.card.editedCard.secondWord);
  const { preferredLanguage, selectedLanguages } = useSelector((state: AppState) => state.card);

  const [editingMode, setEditingMode] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);
  const { userId, cardId, ...words } = currentCard;

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

  const getWordLanguage = (word: string) => allLanguages.find((obj) => obj.full === word);

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
      [selectedLanguages[0]]: firstWordEdited,
      [selectedLanguages[1]]: secondWordEdited,
      cardId,
    }).unwrap();
    setEditingMode(!editingMode);
  };

  return (
    <Card size="large">
      <Stack
        flex={10}
        onClick={toggleLanguage}
        justifyContent="center"
      >
        {editingMode ? (
          <Stack spacing={3} m={3}>
            <LanguageSelector
              languageNumber="first"
              specificLanguage={getWordLanguage(selectedLanguages[0])}
              actionType={setEditedCard}
            />
            <Autocomplete
              languageNumber="first"
              language={selectedLanguages[0]}
              actionType={setEditedCard}
              disabled={false}
              value={words[selectedLanguages[0] as keyof typeof words]}
              variant="standard"
            />
            <LanguageSelector
              languageNumber="second"
              specificLanguage={getWordLanguage(selectedLanguages[1])}
              actionType={setEditedCard}
            />
            <Autocomplete
              languageNumber="second"
              language={selectedLanguages[1]}
              actionType={setEditedCard}
              disabled={false}
              value={words[selectedLanguages[1] as keyof typeof words]}
              variant="standard"
            />
          </Stack>
        ) : (
          <ReadonlyText
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
