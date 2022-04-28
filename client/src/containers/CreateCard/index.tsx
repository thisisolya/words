import React from 'react';
import { Divider, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { firstAutocompleteSelector, modifiableCardSelector, secondAutocompleteSelector } from '../../store/selectors/cards';
import { useCreateNewCardMutation } from '../../store/apis/card-api';
import { setModifiableFirstCard, setModifiableSecondCard, clearModifiableCard } from '../../store/slices/card-slice';
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
  const newCard = useSelector(modifiableCardSelector);
  const firstAutocomplete = useSelector(firstAutocompleteSelector);
  const secondAutocomplete = useSelector(secondAutocompleteSelector);

  const [createCard, { data: creationResult }] = useCreateNewCardMutation();
  const userId = localStorage.getItem('userId');
  const { language: firstLanguage, word: firstWord } = newCard.first || {};
  const { language: secondLanguage, word: secondWord } = newCard.second || {};

  const modifiableCardFunction = {
    first: setModifiableFirstCard,
    second: setModifiableSecondCard,
  };

  React.useEffect(() => {
    if (creationResult) {
      if (creationResult.insertedId) {
        showAlert({
          text: 'Word was sucessfullly created!',
          severity: 'success',
        });
        dispatch(clearModifiableCard());
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
    }
  }, [creationResult]);

  const handleCreateCard = React.useCallback(() => {
    createCard({
      userId,
      [firstLanguage as keyof ModifiableCard]: firstWord,
      [secondLanguage as keyof ModifiableCard]: secondWord,
    }).unwrap();
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
