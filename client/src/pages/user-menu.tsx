import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useUserInfo from '../hooks/use-user-info';
import useCardsList from '../hooks/use-cards-list';

import ButtonContained from '../components/shared/button-contained';
import Container from '../components/shared/container';

function UserMenu() {
  const navigate = useNavigate();
  const selectedUser = useUserInfo();
  const cardsList = useCardsList();

  if (!cardsList || !selectedUser) return null;

  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        Welcome,
        {' '}
        {selectedUser.firstName}
        !
      </Typography>
      <Typography textAlign="center">What would you like to do?</Typography>
      <Grid container gap={2} justifyContent="center">
        <ButtonContained
          text="Add card"
          clickHandler={() => navigate('/cards/create')}
        />
        <ButtonContained
          text="Practice"
          clickHandler={() => navigate(`/cards/${selectedUser.id}`)}
        />
        <ButtonContained
          text="Settings"
          clickHandler={() => navigate('/user/settings')}
        />
      </Grid>
    </Container>
  );
}

export default UserMenu;
