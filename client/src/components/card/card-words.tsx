import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import { Card as CardType } from '../../types';
import { AppState } from '../../store';
import { useDeleteCardMutation, useEditCardMutation } from '../../store/api';
import useAlert from '../../hooks/use-alert';

import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';

import Card from '../shared/card';
import CardToolbar from '../shared/card-toolbar';
import useModal from '../../hooks/use-modal';
import { setCurrentCard, setEditedCard, setPreferredLanguage } from '../../store/slices/card-slice';
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
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const firstWordEdited = useSelector((state: AppState) => state.card.editedCard.firstWord);
  const secondWordEdited = useSelector((state: AppState) => state.card.editedCard.secondWord);

  const [editingMode, setEditingMode] = React.useState(false);
  const preferredLanguage = useSelector((state: AppState) => state.card.preferredLanguage);
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);
  const { userId, cardId, ...words } = currentCard;
  const languages = Object.keys(words);

  const firstLanguage = Object.keys(words)[0];
  const firstWord = Object.values(words)[0];
  const secondLanguage = Object.keys(words)[1];
  const secondWord = Object.values(words)[1];

  React.useEffect(() => {
    dispatch(
      setPreferredLanguage(
        Object.keys(words)[0],
      ),
    );
  }, []);

  React.useEffect(() => {
    dispatch(
      setCurrentCard({
        firstLanguage,
        firstWord,
        secondLanguage,
        secondWord,
        userId,
        cardId,
      }),
    );
  }, [currentCard]);

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage]);

  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();

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
      [languages[0]]: firstWordEdited,
      [languages[1]]: secondWordEdited,
      cardId,
    }).unwrap();
    setEditingMode(!editingMode);
  };

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
          <Stack spacing={3} m={3}>
            <LanguageSelector
              languageNumber="first"
              specificLanguage={allLanguages.find((obj) => obj.full === firstLanguage)}
              actionType={setEditedCard}
            />
            <Autocomplete
              languageNumber="first"
              language={firstLanguage}
              actionType={setEditedCard}
              disabled={false}
              value={firstWord}
              variant="standard"
            />
            <LanguageSelector
              languageNumber="first"
              specificLanguage={allLanguages.find((obj) => obj.full === secondLanguage)}
              actionType={setEditedCard}
            />
            <Autocomplete
              languageNumber="second"
              language={secondLanguage}
              actionType={setEditedCard}
              disabled={false}
              value={secondWord}
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
