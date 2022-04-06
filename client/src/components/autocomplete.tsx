import React from 'react';
import _ from 'lodash';

import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import allRussianWords from '../helpers/ru_words.json';
import allEnglishWords from '../helpers/en_words.json';

interface AutocompleteProps {
  language: string,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const options: Record<string, any> = {
  english: allEnglishWords,
  russian: allRussianWords,
};

function Autocomplete({ language }: AutocompleteProps) {
  const [autocompleteOptions, setAutocompleteOptions] = React.useState<string[]>([]);
  const [noOptionsText, setNoOptionsText] = React.useState('Please enter at least 3 characters');

  const handleInputChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    const currentInputValue = target.value;
    if (currentInputValue.length >= 3) {
      setNoOptionsText('Lack of corresponding words');
      setAutocompleteOptions(options[language as keyof typeof options].filter((word: string) => (
        word.startsWith(currentInputValue)
      )));
    } else {
      setNoOptionsText('Please enter at least 3 characters');
    }
  };

  return (
    <MuiAutocomplete
      options={autocompleteOptions}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          type="text"
          label={_.startCase(language)}
        />
      )}
      noOptionsText={noOptionsText}
    />
  );
}

export default Autocomplete;
