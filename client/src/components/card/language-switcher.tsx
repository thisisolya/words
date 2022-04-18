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

  const textFisrtLanguage = `${_.upperFirst(selectedLanguages[0])} first`;
  const textSecondLanguage = `${_.upperFirst(selectedLanguages[1])} first`;

  const toggleLanguage = () => {
    dispatch(
      setPreferredLanguage(
        preferredLanguage === selectedLanguages[0]
          ? selectedLanguages[1]
          : selectedLanguages[0],
      ),
    );
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" mb={1}>
      <Typography fontSize="12px">{textFisrtLanguage}</Typography>
      <Switch size="small" color="primary" onChange={toggleLanguage} />
      <Typography fontSize="12px">{textSecondLanguage}</Typography>
    </Stack>
  );
}

export default LanguagesSwitcher;
