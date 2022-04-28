import React from 'react';
import { Stack } from '@mui/material';
import Autocomplete from '../../Autocomplete';
import LanguagePicker from '../../LanguagePicker';

interface EditableWordsProps {
  words: Record<string, string>[],
  changeHandler: (wordNumber: string, word: { [key:string]: string }) => void,
  autocompleteOptions: (count: string) => string[],
}

function EditableCardWords({
  words, changeHandler, autocompleteOptions,
}: EditableWordsProps) {
  const getIndex = (index: number) => (index ? 'second' : 'first');

  return (
    <Stack spacing={3} m={3}>
      {words.map((word, index) => (
        <div key={word[0]}>
          <LanguagePicker
            languageNumber={getIndex(index)}
            specificLanguage={word[0]}
            clickHandler={changeHandler}
          />
          <Autocomplete
            autocompleteOptionsList={autocompleteOptions(getIndex(index))}
            languageNumber={getIndex(index)}
            language={word[0]}
            changeHandler={changeHandler}
            value={word[1]}
            variant="standard"
          />
        </div>
      ))}
    </Stack>
  );
}

export default EditableCardWords;
