import React from 'react';
import { Stack, Typography, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { AppState } from '../../store';
import { setPreferredLanguage } from '../../store/slices/card-slice';

function LanguagesSwitcher() {
  const dispatch = useDispatch();
  const { preferredLanguage } = useSelector((state: AppState) => state.card);
  const { firstLanguage, secondLanguage } = useSelector((state: AppState) => (
    state.card.currentCard));
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);

  const textFisrtLanguage = `${_.upperFirst(firstLanguage)} first`;
  const textSecondLanguage = `${_.upperFirst(secondLanguage)} first`;

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === firstLanguage ? secondLanguage : firstLanguage);
    dispatch(setPreferredLanguage(currentLanguage));
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
