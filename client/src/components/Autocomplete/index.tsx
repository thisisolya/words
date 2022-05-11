/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import _ from 'lodash';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';

interface AutocompleteProps {
  autocompleteOptionsList?: string[];
  disabled?: boolean;
  language?: string,
  languageNumber: string,
  changeHandler: (wordNumber: string, word: { [key:string]: string }) => void,
  value?: string,
  variant?: 'standard' | 'filled' | 'outlined',
}

function Autocomplete({
  autocompleteOptionsList,
  changeHandler,
  disabled,
  language,
  languageNumber,
  value,
  variant,
}: AutocompleteProps) {
  const [noOptionsText, setNoOptionsText] = React.useState('Please enter at least 3 characters');
  const label = _.upperFirst(allLanguages[language as keyof typeof allLanguages])
  || 'Please select a language first';

  const handleChange = React.useCallback(({ target }: { target: any }) => {
    const selectedValue = target.value || target.innerHTML;
    changeHandler(languageNumber, { word: selectedValue });
  }, [changeHandler]);

  const handleInputChange = React.useCallback((event: any) => {
    if (event) {
      const currentValue = event.target.value;
      if (currentValue.length >= 3) {
        changeHandler(languageNumber, { filterable: currentValue });
      } else {
        setNoOptionsText('Please enter at least 3 characters');
      }
    }
  }, [autocompleteOptionsList]);

  return (
    <MuiAutocomplete
      options={autocompleteOptionsList || []}
      onBlur={handleChange}
      onClose={handleChange}
      onInputChange={handleInputChange}
      defaultValue={value}
      disabled={disabled}
      freeSolo
      noOptionsText={noOptionsText}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label={label}
          variant={variant}
          type="text"
        />
      )}
    />
  );
}

export default Autocomplete;
