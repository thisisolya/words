import React from 'react';
import { Stack, Chip, Typography } from '@mui/material';
import _ from 'lodash';
import { keys } from 'ramda';
import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';
import { NewCard } from '../../types';

interface LanguagesSelectorProps {
  languageNumber: string,
  specificLanguage?: string,
  clickHandler: (arg: Record<string, string>) => void,
  newCard?: NewCard,
}

function LanguagePicker({
  languageNumber, specificLanguage, clickHandler, newCard,
}:LanguagesSelectorProps) {
  const languages = (specificLanguage && [specificLanguage]) || keys(allLanguages);
  const languageKey = `${languageNumber}Language`;
  const currentLanguage = newCard && newCard[languageKey as keyof NewCard];
  const notToBeEqualToLanguage = languageKey === 'firstLanguage' ? 'secondLanguage' : 'firstLanguage';

  React.useEffect(() => {
    if (specificLanguage) { clickHandler({ [languageKey]: specificLanguage }); }
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
            onClick={() => language && clickHandler({ [languageKey]: language })}
            disabled={newCard && language === newCard[notToBeEqualToLanguage]}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default LanguagePicker;
