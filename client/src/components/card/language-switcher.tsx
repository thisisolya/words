import React from 'react';
import { Stack, Typography, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPreferredLanguage } from '../../store/slices/card-slice';
import { AppState } from '../../store';

function LanguagesSwitcher() {
  const dispatch = useDispatch();
  const { preferredLanguage } = useSelector((state: AppState) => state.card);
  const languages = useSelector((state: AppState) => state.card.currentCard?.languages);

  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);

  const toggleLanguage = () => {
    if (languages) {
      setCurrentLanguage(currentLanguage === languages[0] ? languages[1] : languages[0]);
      dispatch(setPreferredLanguage(currentLanguage));
    }
  };

  if (!languages) return null;

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" mb={1}>
      <Typography fontSize="12px">
        {languages[0]}
        {' '}
        first
      </Typography>
      <Switch size="small" color="primary" onChange={toggleLanguage} />
      <Typography fontSize="12px">
        {languages[1]}
        {' '}
        first
      </Typography>
    </Stack>
  );
}

export default LanguagesSwitcher;
