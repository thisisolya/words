import React from 'react';
import { Typography } from '@mui/material';
import { User } from '../../types';
import CardLayout from '../CardLayout';

interface UserCardProps {
  user: User,
  clickHandler: () => void
}

function UserCard({ user, clickHandler }: UserCardProps) {
  return (
    <CardLayout key={user.id} size="small">
      <div aria-hidden onClick={clickHandler} style={{ cursor: 'pointer' }}>
        <Typography align="center">{`${user.firstName} ${user.lastName}`}</Typography>
      </div>
    </CardLayout>
  );
}

export default UserCard;
