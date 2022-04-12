import React from 'react';
import { Stack, Chip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import _ from 'lodash';
import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';

import { AppState } from '../../store';
import { NewCard } from '../../types';

interface LanguagesSelectorProps {
  languageNumber: string,
  specificLanguage?: Record<string, string>,
  actionType: ActionCreatorWithPayload<Record<string, string>, string>,
}

function LanguageSelector({ languageNumber, specificLanguage, actionType }:LanguagesSelectorProps) {
  const dispatch = useDispatch();
  const { newCard } = useSelector((state: AppState) => state.card);
  const languages = specificLanguage ? [specificLanguage] : allLanguages;
  const languageKey = `${languageNumber}Language`;
  const notToBeEqualToLanguage = languageKey === 'firstLanguage' ? 'secondLanguage' : 'firstLanguage';

  const handleClick = (language: string) => dispatch(actionType({ [languageKey]: language }));

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
            variant={newCard[languageKey as keyof NewCard] === language.full || specificLanguage ? 'filled' : 'outlined'}
            clickable
            onClick={() => handleClick(language.full)}
            disabled={language.full === newCard[notToBeEqualToLanguage]}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default LanguageSelector;
