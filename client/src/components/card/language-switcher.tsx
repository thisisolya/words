import React from 'react';
import { Stack, Typography, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { AppState } from '../../store';
import { setPreferredLanguage } from '../../store/slices/card-slice';

function LanguagesSwitcher() {
  const dispatch = useDispatch();
  const { preferredLanguage } = useSelector((state: AppState) => state.card);
  const { selectedLanguages } = useSelector((state: AppState) => (state.card));
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);

  const textFisrtLanguage = `${_.upperFirst(selectedLanguages[0])} first`;
  const textSecondLanguage = `${_.upperFirst(selectedLanguages[1])} first`;

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === selectedLanguages[0]
      ? selectedLanguages[1]
      : selectedLanguages[0]);
    dispatch(setPreferredLanguage(currentLanguage));
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" mb={1}>
      <Typography fontSize="12px">{textSecondLanguage}</Typography>
      <Switch size="small" color="primary" onChange={toggleLanguage} />
      <Typography fontSize="12px">{textFisrtLanguage}</Typography>
    </Stack>
  );
}

export default LanguagesSwitcher;
