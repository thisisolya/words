import React from 'react';
import {
  FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useCreateNewCardMutation } from '../store/api';
import useAlert from '../hooks/use-alert';

import ButtonContained from '../components/shared/button-contained';
import Container from '../components/shared/container';
import Card from '../components/shared/card';
import Autocomplete from '../components/autocomplete';
import { AppState } from '../store';
import { NewCard } from '../types';
import { setNewCard } from '../store/slices/card-slice';
import LanguageSelector from '../components/card/language-selector';

function CreateCard() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstWord = useSelector((state: AppState) => state.card.newCard?.firstWord);
  const firstLanguage = useSelector((state: AppState) => state.card.newCard?.firstLanguage);
  const secondWord = useSelector((state: AppState) => state.card.newCard?.secondWord);
  const secondLanguage = useSelector((state: AppState) => state.card.newCard?.secondLanguage);

  const [createCard, { data: creationResult }] = useCreateNewCardMutation();

  const userId = localStorage.getItem('userId');

  React.useEffect(() => {
    if (creationResult) {
      if (creationResult.insertedId) {
        showAlert({
          text: 'Word was sucessfullly created!',
          severity: 'success',
        });
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
        <Typography variant="body1" textAlign="center">
          Please type a word and its equivalent in English and hit &ldquo;submit&rdquo;
        </Typography>
        <LanguageSelector changeHandler={() => console.log('lala')} />

        <Autocomplete language="russian" />
        <Autocomplete language="english" />
        <ButtonContained
          clickHandler={handleCreateCard}
          disabled={!secondLanguage || !firstLanguage}
          text="Submit"
        />
      </Card>
      <ButtonContained text="Start practicing!" clickHandler={() => navigate(`/cards/${userId}`)} />
    </Container>
  );
}

export default CreateCard;

// onChange={(e) => setRussianWord(e.target.value)}
// eslint-disable-next-line react/jsx-props-no-spreading
