import React from 'react';
import { Divider, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useAlert from '../hooks/use-alert';
import { AppState } from '../store';
import { useCreateNewCardMutation } from '../store/api';
import { clearNewCard, setNewCard } from '../store/slices/card-slice';
import { NewCard } from '../types';

import Autocomplete from '../components/autocomplete';
import ButtonContained from '../components/shared/button-contained';
import Card from '../components/shared/card';
import Container from '../components/shared/container';
import LanguageSelector from '../components/card/language-selector';

function CreateCard() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    firstLanguage, secondLanguage, firstWord, secondWord,
  } = useSelector((state: AppState) => state.card.newCard);
  const [createCard, { data: creationResult }] = useCreateNewCardMutation();
  const userId = localStorage.getItem('userId');

  React.useEffect(() => {
    if (creationResult) {
      if (creationResult.insertedId) {
        showAlert({
          text: 'Word was sucessfullly created!',
          severity: 'success',
        });
        dispatch(clearNewCard());
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
    }
  }, [creationResult]);

  const handleCreateCard = () => {
    createCard({
      userId,
      [firstLanguage as keyof NewCard]: firstWord,
      [secondLanguage as keyof NewCard]: secondWord,
    }).unwrap();
  };

  return (
    <Container>
      <Card size="medium">
        <Stack gap={1.5} my={3}>
          <LanguageSelector languageNumber="first" actionType={setNewCard} />
          <Autocomplete language={firstLanguage} languageNumber="first" actionType={setNewCard} disabled={!firstLanguage} />
        </Stack>
        <Divider variant="fullWidth" />
        <Stack gap={1.5} my={3}>
          <LanguageSelector languageNumber="second" actionType={setNewCard} />
          <Autocomplete language={secondLanguage} languageNumber="second" actionType={setNewCard} disabled={!secondLanguage} />
        </Stack>
        <ButtonContained
          clickHandler={handleCreateCard}
          disabled={!secondWord || !firstWord}
          text="Submit"
        />
      </Card>
      <ButtonContained text="Back to menu" clickHandler={() => navigate('/')} />
    </Container>
  );
}

export default CreateCard;
