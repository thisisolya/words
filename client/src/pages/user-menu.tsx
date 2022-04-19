import React from 'react';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetAllCardsQuery, useGetUserInfoQuery } from '../store/api';
import { selectedUserSelector } from '../store/selectors/user';

import ButtonContained from '../components/shared/button-contained';
import Container from '../components/shared/container';
import LanguageOptions from '../components/language-options';

function UserMenu() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const selectedUser = useSelector(selectedUserSelector);

  const { data } = useGetUserInfoQuery({ userId });
  const { isError } = useGetAllCardsQuery({ userId: selectedUser?.id });

  React.useEffect(() => {
    if (!userId) navigate('/');
  }, []);

  if (userId && !data) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        Welcome,
        {' '}
        {selectedUser?.firstName}
        !
      </Typography>
      <Typography textAlign="center">What would you like to do?</Typography>
      {!isError && <LanguageOptions />}
      <Grid container gap={2} justifyContent="center">
        <ButtonContained
          text="Add card"
          clickHandler={() => navigate('cards/create')}
        />
        <ButtonContained
          text="Settings"
          clickHandler={() => navigate('settings')}
        />
      </Grid>
    </Container>
  );
}

export default UserMenu;
