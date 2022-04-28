import React from 'react';
import { Stack, Chip, Typography } from '@mui/material';
import _ from 'lodash';
import { keys } from 'ramda';
import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';
import { ModifiableCard } from '../../types';

interface LanguagesSelectorProps {
  languageNumber: string,
  specificLanguage?: string,
  clickHandler: (wordNumber: string, word: { [key: string]: string; }) => void,
  newCard?: ModifiableCard,
}

function LanguagePicker({
  languageNumber, specificLanguage, clickHandler, newCard,
}:LanguagesSelectorProps) {
  const currentWord = newCard && newCard[languageNumber as keyof ModifiableCard];
  const currentLanguage = currentWord?.language;
  const languages = specificLanguage ? [specificLanguage] : keys(allLanguages);
  const notToBeEqualToLanguage = languageNumber === 'first'
    ? newCard?.second?.language
    : newCard?.first?.language;

  React.useEffect(() => {
    if (specificLanguage) clickHandler(languageNumber, { language: specificLanguage });
  }, [specificLanguage]);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography>
        {_.upperFirst(languageNumber)}
        {' '}
        language
      </Typography>
      <Stack direction="row" flex={1} gap={2}>
        {languages.map((language) => (
          <Chip
            key={React.useId()}
            label={language}
            variant={(specificLanguage || currentLanguage === language) ? 'filled' : 'outlined'}
            clickable={!!currentLanguage}
            onClick={() => language && clickHandler(languageNumber, { language })}
            disabled={newCard && language === notToBeEqualToLanguage}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default LanguagePicker;
