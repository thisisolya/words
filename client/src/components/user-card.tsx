import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User } from '../types';

import Card from './shared/card';
import { setSelectedUser } from '../store/slices/user-slice';

function UserCard({ user }: { user: User }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.setItem('userId', user.id);
    dispatch(setSelectedUser(user));
    navigate(`user/${user.id}`);
  };

  return (
    <Card key={user.id} size="small">
      <div aria-hidden onClick={handleClick} style={{ cursor: 'pointer' }}>
        <Typography align="center">
          {user.firstName}
          {' '}
          {user.lastName}
        </Typography>
      </div>
    </Card>
  );
}

export default UserCard;
