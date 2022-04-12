import React from 'react';
import _ from 'lodash';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import allRussianWords from '../helpers/ru_words.json';
import allEnglishWords from '../helpers/en_words.json';
import allGermanWords from '../helpers/de_words.json';

interface AutocompleteProps {
  language: string,
  languageNumber: string,
  actionType: ActionCreatorWithPayload<Record<string, string>, string>,
  disabled: boolean,
  value?: string,
  variant?: 'standard' | 'filled' | 'outlined',
}

const options: Record<string, any> = {
  english: allEnglishWords,
  russian: allRussianWords,
  german: allGermanWords,
};

function Autocomplete({
  languageNumber, language, actionType, disabled, value, variant,
}: AutocompleteProps) {
  const dispatch = useDispatch();

  const [autocompleteOptions, setAutocompleteOptions] = React.useState<string[]>([]);
  const [noOptionsText, setNoOptionsText] = React.useState('Please enter at least 3 characters');

  const label = language || 'Please select a language first';
  const wordKey = `${languageNumber}Word`;

  const handleChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    const selectedValue = target.value || target.innerHTML;
    dispatch(actionType({ [wordKey]: selectedValue }));
  };

  const handleInputChange = (event: React.SyntheticEvent<Element, Event>) => {
    if (event) {
      const target = event.target as HTMLInputElement;
      const currentInputValue = target.value;
      if (currentInputValue && currentInputValue.length >= 3) {
        setNoOptionsText('Lack of corresponding words');
        setAutocompleteOptions(options[language as keyof typeof options].filter((word: string) => (
          word.startsWith(currentInputValue)
        )));
      } else {
        setNoOptionsText('Please enter at least 3 characters');
      }
    }
  };

  return (
    <MuiAutocomplete
      options={autocompleteOptions}
      onBlur={handleChange}
      onClose={handleChange}
      onInputChange={handleInputChange}
      defaultValue={value}
      freeSolo
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          variant={variant}
          type="text"
          label={_.upperFirst(label)}
        />
      )}
      noOptionsText={noOptionsText}
      disabled={disabled}
    />
  );
}

export default Autocomplete;
