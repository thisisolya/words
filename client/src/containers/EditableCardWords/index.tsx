import React from 'react';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { omit, toPairs } from 'ramda';

import {
  currentCardNumberSelector,
  firstAutocompleteSelector,
  secondAutocompleteSelector,
  selectedCardsSelector,
} from '../../store/selectors/cards';
import {
  setModifiableFirstCard,
  setModifiableSecondCard,
} from '../../store/slices/card-slice';
import { Card } from '../../types';

import Autocomplete from '../../components/Autocomplete';
import LanguagePicker from '../../components/LanguagePicker';

function EditableCardWords() {
  const dispatch = useDispatch();

  const selectedCards = useSelector(selectedCardsSelector) as Card[] || [];
  const currentCardNumber = useSelector(currentCardNumberSelector) as number;
  const autocompleteSelector = {
    first: useSelector(firstAutocompleteSelector),
    second: useSelector(secondAutocompleteSelector),
  };
  const modifiableCardFunction = {
    first: setModifiableFirstCard,
    second: setModifiableSecondCard,
  };

  const words = toPairs(omit(['userId', 'cardId'])(selectedCards[currentCardNumber]));
  const indexArray = ['first', 'second'];

  const setEditedCardInfo = (wordNumber: string, word: { [key:string]: string }) => {
    dispatch(modifiableCardFunction[wordNumber as keyof typeof modifiableCardFunction](word));
  };
  const getAutocompleteOptions = (wordNumber: string) => (
    autocompleteSelector[wordNumber as keyof typeof autocompleteSelector]);

  return (
    <Stack spacing={3} m={3}>
      {words.map((word, index) => (
        <div key={word[0]}>
          <LanguagePicker
            languageNumber={indexArray[index]}
            specificLanguage={word[0]}
            clickHandler={setEditedCardInfo}
          />
          <Autocomplete
            autocompleteOptionsList={getAutocompleteOptions(indexArray[index])}
            languageNumber={indexArray[index]}
            language={word[0]}
            changeHandler={setEditedCardInfo}
            value={word[1]}
            variant="standard"
          />
        </div>
      ))}
    </Stack>
  );
}

export default EditableCardWords;
