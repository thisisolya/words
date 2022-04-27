import React from 'react';
import _ from 'lodash';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';

interface AutocompleteProps {
  autocompleteOptionsList?: string[];
  language?: string,
  languageNumber: string,
  inputHandler: (options: Record<string, string>) => void,
  clickHandler: (word: Record<string, string>) => void,
  value?: string,
  variant?: 'standard' | 'filled' | 'outlined',
}

function Autocomplete({
  autocompleteOptionsList,
  clickHandler,
  inputHandler,
  language,
  languageNumber,
  value,
  variant,
}: AutocompleteProps) {
  const [noOptionsText, setNoOptionsText] = React.useState('Please enter at least 3 characters');
  const label = _.upperFirst(allLanguages[language as keyof typeof allLanguages])
  || 'Please select a language first';

  const handleChange = React.useCallback((event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    const selectedValue = target.value || target.innerHTML;
    clickHandler({ [`${languageNumber}Word`]: selectedValue });
  }, [clickHandler]);

  const handleInputChange = React.useCallback((event: React.SyntheticEvent<Element, Event>) => {
    if (event) {
      const target = event.target as HTMLInputElement;
      const currentInputValue = target.value;

      if (currentInputValue && currentInputValue.length >= 3) {
        inputHandler({ [`${languageNumber}Filterable`]: currentInputValue });
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
