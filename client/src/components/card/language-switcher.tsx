import React from 'react';
import { Stack, Typography, Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPreferredLanguage } from '../../store/slice';

function LanguagesSwitcher({
  languages,
}: {
  languages: string[];
}) {
  const dispatch = useDispatch();
  const [currentLanguage, setCurrentLanguage] = React.useState(languages[0]);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === languages[0] ? languages[1] : languages[0]);
    dispatch(setPreferredLanguage(currentLanguage));
  };

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
