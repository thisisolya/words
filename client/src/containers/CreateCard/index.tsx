import React from 'react';
import { Divider, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { newCardSelector } from '../../store/selectors/cards';
import { useCreateNewCardMutation } from '../../store/apis/card-api';
import { clearNewCard, setNewCard } from '../../store/slices/card-slice';
import { NewCard } from '../../types';
import useAlert from '../../hooks/useAlert';

import AnimatedContainer from '../../components/AnimatedContainer';
import Autocomplete from '../../components/Autocomplete';
import ButtonContained from '../../components/ButtonContained';
import CardLayout from '../../components/CardLayout';
import LanguagePicker from '../../components/LanguagePicker';

function CreateCard() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newCard = useSelector(newCardSelector);
  const [createCard, { data: creationResult }] = useCreateNewCardMutation();
  const userId = localStorage.getItem('userId');
  const {
    firstLanguage, secondLanguage, firstWord, secondWord,
  } = newCard || {};

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

  const handleCreateCard = React.useCallback(() => {
    createCard({
      userId,
      [firstLanguage as keyof NewCard]: firstWord,
      [secondLanguage as keyof NewCard]: secondWord,
    }).unwrap();
  }, [firstWord, secondWord]);

  const setNewCardInfo = React.useCallback((arg: Record<string, string>) => {
    dispatch(setNewCard(arg));
  }, []);

  return (
    <AnimatedContainer>
      <CardLayout size="medium">
        <Stack gap={1.5} my={3}>
          <LanguagePicker
            languageNumber="first"
            clickHandler={setNewCardInfo}
            newCard={newCard}
          />
          <Autocomplete
            language={firstLanguage || ''}
            languageNumber="first"
            clickHandler={setNewCardInfo}
            disabled={!firstLanguage}
          />
        </Stack>
        <Divider variant="fullWidth" />
        <Stack gap={1.5} my={3}>
          <LanguagePicker
            languageNumber="second"
            clickHandler={setNewCardInfo}
            newCard={newCard}
          />
          <Autocomplete
            language={secondLanguage || ''}
            languageNumber="second"
            clickHandler={setNewCardInfo}
            disabled={!secondLanguage}
          />
        </Stack>
        <ButtonContained
          clickHandler={handleCreateCard}
          disabled={!secondWord || !firstWord}
          text="Submit"
        />
      </CardLayout>
      <ButtonContained text="Back to menu" clickHandler={() => navigate('/')} />
    </AnimatedContainer>
  );
}

export default CreateCard;
