import React from 'react';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetAllUsersQuery } from '../../store/apis/user-api';
import { allUsersSelector } from '../../store/selectors/user';
import { setSelectedUser } from '../../store/slices/user-slice';
import { User } from '../../types';

import AnimatedContainer from '../../components/AnimatedContainer';
import ButtonContained from '../../components/ButtonContained';
import CreateUser from '../CreateUser';
import UserCard from '../../components/UserCard';

function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const allUsers = useSelector(allUsersSelector) as User[];

  const { isFetching } = useGetAllUsersQuery('/');

  React.useEffect(() => {
    if (userId) navigate(`user/${userId}`);
  }, []);

  const handleUserSelection = (user: User) => {
    localStorage.setItem('userId', user.id);
    dispatch(setSelectedUser(user));
    navigate(`user/${user.id}`);
  };

  if (isFetching) {
    return <CircularProgress />;
  }

  if (!allUsers) {
    return <CreateUser />;
  }

  return (
    <AnimatedContainer>
      <Typography variant="h2" textAlign="center">
        Who&apos;s playing?
      </Typography>
      <Grid container gap="15px" justifyContent="center" mt="20px">
        {allUsers?.map((user: User) => (
          <UserCard
            key={user.id}
            user={user}
            clickHandler={() => handleUserSelection(user)}
          />
        ))}
        <ButtonContained
          text="Create new user"
          clickHandler={() => navigate('user/create')}
        />
      </Grid>

    </AnimatedContainer>
  );
}

export default UsersList;
