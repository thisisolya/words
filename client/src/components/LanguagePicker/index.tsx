import React from 'react';
import { Stack, Chip, Typography } from '@mui/material';
import _ from 'lodash';
import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';
import { NewCard } from '../../types';

interface LanguagesSelectorProps {
  languageNumber: string,
  specificLanguage?: Record<string, string>,
  clickHandler: (arg: Record<string, string>) => void,
  newCard?: NewCard,
}

function LanguagePicker({
  languageNumber, specificLanguage, clickHandler, newCard,
}:LanguagesSelectorProps) {
  const languages = specificLanguage ? [specificLanguage] : allLanguages;
  const languageKey = `${languageNumber}Language`;
  const currentLanguage = newCard && newCard[languageKey as keyof NewCard];
  const notToBeEqualToLanguage = languageKey === 'firstLanguage' ? 'secondLanguage' : 'firstLanguage';

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography>
        {_.upperFirst(languageNumber)}
        {' '}
        language
      </Typography>
      <Stack direction="row" flex={1} gap={2}>
        {languages.map((language: Record<string, string>) => (
          <Chip
            key={React.useId()}
            label={language.short}
            variant={(specificLanguage || currentLanguage === language.full) ? 'filled' : 'outlined'}
            clickable={!!currentLanguage}
            onClick={() => clickHandler({ [languageKey]: language.full })}
            disabled={newCard && language.full === newCard[notToBeEqualToLanguage]}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default LanguagePicker;
