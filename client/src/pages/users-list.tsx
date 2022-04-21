import React from 'react';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetAllUsersQuery } from '../store/apis/user-api';
import { allUsersSelector } from '../store/selectors/user';
import { User } from '../types';

import CreateUser from './create-user';
import UserCard from '../components/user-card';
import Container from '../components/shared/container';
import ButtonContained from '../components/shared/button-contained';
import { setSelectedUser } from '../store/slices/user-slice';

function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const allUsers = useSelector(allUsersSelector);
  const { isLoading } = useGetAllUsersQuery('/');

  React.useEffect(() => {
    if (userId) navigate(`user/${userId}`);
  }, []);

  const handleClick = (user: User) => {
    localStorage.setItem('userId', user.id);
    dispatch(setSelectedUser(user));
    navigate(`user/${user.id}`);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!allUsers) {
    return <CreateUser />;
  }

  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        Who&apos;s playing?
      </Typography>
      <Grid container gap="15px" justifyContent="center" mt="20px">
        {allUsers?.map((user: User) => (
          <UserCard key={user.id} user={user} clickHandler={() => handleClick(user)} />
        ))}
        <ButtonContained
          text="Create new user"
          clickHandler={() => navigate('user/create')}
        />
      </Grid>

    </Container>
  );
}

export default UsersList;
