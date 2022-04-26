import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useCreateNewUserMutation } from '../../store/apis/user-api';
import useAlert from '../../hooks/useAlert';

import AnimatedContainer from '../../components/AnimatedContainer';
import CardLayout from '../../components/CardLayout';

function CreateUser() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [createUser, { data: creationResult }] = useCreateNewUserMutation();

  React.useEffect(() => {
    if (creationResult) {
      if (creationResult.insertedId) {
        showAlert({
          text: 'User was sucessfullly created!',
          severity: 'success',
        });
        navigate('/');
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
    }
  }, [creationResult]);

  const handleCreateUser = () => {
    createUser({ firstName, lastName }).unwrap();
  };

  return (
    <AnimatedContainer>
      <CardLayout size="medium">
        <Typography variant="h2" textAlign="center">
          Create account
        </Typography>
        <TextField
          label="First name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <TextField
          label="Last name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <Button
          variant="contained"
          onClick={handleCreateUser}
          disabled={!firstName || !lastName}
        >
          Let&apos;s go!
        </Button>
      </CardLayout>
    </AnimatedContainer>
  );
}

export default CreateUser;