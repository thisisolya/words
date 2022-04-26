import React from 'react';
import { Stack, Typography, Switch } from '@mui/material';
import _ from 'lodash';
import { head, last } from 'ramda';

interface LanguagesSwitcherProps {
  selectedLanguages: string[],
  toggleLanguage: () => void,
}

function LanguagesSwitcher({ selectedLanguages, toggleLanguage }: LanguagesSwitcherProps) {
  const textFisrtLanguage = `${_.upperFirst(head(selectedLanguages))} first`;
  const textSecondLanguage = `${_.upperFirst(last(selectedLanguages))} first`;

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" mb={1}>
      <Typography fontSize="12px">{textFisrtLanguage}</Typography>
      <Switch size="small" color="primary" onChange={toggleLanguage} />
      <Typography fontSize="12px">{textSecondLanguage}</Typography>
    </Stack>
  );
}

export default LanguagesSwitcher;
