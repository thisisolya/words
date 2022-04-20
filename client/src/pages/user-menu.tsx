import React from 'react';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetAllCardsQuery } from '../store/apis/card-api';
import { useGetUserInfoQuery } from '../store/apis/user-api';
import { selectedUserSelector } from '../store/selectors/user';

import ButtonContained from '../components/shared/button-contained';
import Container from '../components/shared/container';
import LanguageOptions from '../components/language-options';

function UserMenu() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const selectedUser = useSelector(selectedUserSelector);

  const { isFetching } = useGetUserInfoQuery({ userId });
  const { data: cards } = useGetAllCardsQuery({ userId: selectedUser?.id });

  const text = cards && cards.length
    ? 'What would you like to do?'
    : "You don't have any cards yet. Would you like to add some?";

  React.useEffect(() => {
    if (!userId) navigate('/');
  }, []);

  if (isFetching) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        Welcome,
        {' '}
        {selectedUser?.firstName}
        !
      </Typography>
      <Typography textAlign="center">{text}</Typography>
      {cards && !!cards.length && <LanguageOptions />}
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
