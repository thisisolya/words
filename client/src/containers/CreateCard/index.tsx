import React from 'react';
import { Divider, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  firstAutocompleteSelector,
  modifiableCardSelector,
  secondAutocompleteSelector,
} from '../../store/selectors/cards';
import {
  setModifiableFirstCard,
  setModifiableSecondCard,
  clearModifiableCard,
} from '../../store/slices/card-slice';
import { useCreateNewCardMutation } from '../../store/apis/card-api';
import { ModifiableCard } from '../../types';
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
  const newCard = useSelector(modifiableCardSelector) as ModifiableCard;
  const firstAutocomplete = useSelector(firstAutocompleteSelector) as string[];
  const secondAutocomplete = useSelector(secondAutocompleteSelector) as string[];

  const userId = localStorage.getItem('userId');
  const { language: firstLanguage, word: firstWord } = newCard.first || {};
  const { language: secondLanguage, word: secondWord } = newCard.second || {};
  const modifiableCardFunction = {
    first: setModifiableFirstCard,
    second: setModifiableSecondCard,
  };

  const [createCard] = useCreateNewCardMutation();

  const handleCreateCard = React.useCallback(() => {
    createCard({
      userId,
      [firstLanguage as keyof ModifiableCard]: firstWord,
      [secondLanguage as keyof ModifiableCard]: secondWord,
    }).unwrap()
      .then((result) => {
        if (result.insertedId) {
          showAlert({ text: 'Card has been sucessfullly created!', severity: 'success' });
          dispatch(clearModifiableCard());
        } else showAlert({ text: 'Card has not been created:(', severity: 'error' });
      })
      .catch((error) => error && showAlert({ text: 'Something went wrong:(', severity: 'error' }));
  }, [firstWord, secondWord]);

  const setNewCardInfo = (wordNumber: string, word: { [key:string]: string }) => {
    dispatch(modifiableCardFunction[wordNumber as keyof typeof modifiableCardFunction](word));
  };

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
            disabled={!firstLanguage}
            autocompleteOptionsList={firstAutocomplete}
            changeHandler={setNewCardInfo}
            language={firstLanguage}
            languageNumber="first"
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
            disabled={!secondLanguage}
            autocompleteOptionsList={secondAutocomplete}
            changeHandler={setNewCardInfo}
            language={secondLanguage}
            languageNumber="second"
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
