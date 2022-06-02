import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsersInfo, setSelectedUserId } from '../../store/slices/user-slice';
import { allUsersSelector } from '../../store/selectors/user';
import { User } from '../../types';

import AnimatedContainer from '../../components/AnimatedContainer';
import ButtonContained from '../../components/ButtonContained';
import CreateUser from '../CreateUser';
import UserCard from '../../components/UserCard';

function UsersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const allUsers = useSelector(allUsersSelector) as User[];

  React.useEffect(() => {
    if (userId) {
      navigate(`user/${userId}`);
    } else dispatch(getAllUsersInfo());
  }, []);

  const letters = ['a', 'b', 'c'];

  for (let i = 0; i < 1000; i += 1) {
    const letter = 'abc';

    console.log(letter);
  }

  const handleUserSelection = (id: string) => {
    localStorage.setItem('userId', id);
    setSelectedUserId(id);
    navigate(`user/${id}`);
  };

  if (!allUsers) return null;
  if (allUsers.length === 0) {
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
            clickHandler={() => handleUserSelection(user.id)}
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
