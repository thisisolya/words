import React from 'react';
import { Stack, Typography, Switch } from '@mui/material';
import _ from 'lodash';
import { head, last } from 'ramda';
import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';

interface LanguagesSwitcherProps {
  selectedLanguages: string[],
  toggleLanguage: () => void,
}

function LanguagesSwitcher({ selectedLanguages, toggleLanguage }: LanguagesSwitcherProps) {
  const getSwitcherText = (target: (str: string[]) => string) => (
    `${_.upperFirst(allLanguages[target(selectedLanguages) as keyof typeof allLanguages])} first`
  );
  const textFisrtLanguage = getSwitcherText(head);
  const textSecondLanguage = getSwitcherText(last);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" mb={1}>
      <Typography fontSize="12px">{textFisrtLanguage}</Typography>
      <Switch size="small" color="primary" onChange={toggleLanguage} />
      <Typography fontSize="12px">{textSecondLanguage}</Typography>
    </Stack>
  );
}

export default LanguagesSwitcher;
