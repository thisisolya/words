import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

import CreateUser from './create-user';
import UserMenu from './user-menu';
import UserCard from '../components/user-card';
import Container from '../components/shared/container';
import ButtonContained from '../components/shared/button-contained';
import useUsersList from '../hooks/use-users-list';

function UsersList() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { allUsers } = useUsersList();

  if (!allUsers) {
    return <CreateUser />;
  }

  if (userId) {
    return <UserMenu />;
  }

  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        Who&apos;s playing?
      </Typography>
      <React.Suspense fallback={<div>lalal</div>}>
        <Grid container gap="15px" justifyContent="center" mt="20px">
          {allUsers?.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Grid>
      </React.Suspense>
      <ButtonContained
        text="Create new user"
        clickHandler={() => navigate('user/create')}
      />
    </Container>
  );
}

export default UsersList;
