import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useCreateNewUserMutation } from '../../store/apis/user-api';
import useAlert from '../../hooks/useAlert';

import AnimatedContainer from '../../components/AnimatedContainer';
import CardLayout from '../../components/CardLayout';
import EditableText from '../../components/EditableText';
import ButtonContained from '../../components/ButtonContained';

function CreateUser() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [createUser] = useCreateNewUserMutation();

  const handleCreateUser = () => {
    createUser({ firstName, lastName }).unwrap()
      .then((result) => {
        if (result.insertedId) {
          showAlert({ text: 'User has been sucessfullly created!', severity: 'success' });
          navigate('/');
        } else {
          showAlert({ text: 'User has not been created:(', severity: 'error' });
        }
      })
      .catch((error) => error && showAlert({ text: 'Something went wrong:(', severity: 'error' }));
  };

  return (
    <AnimatedContainer>
      <CardLayout size="medium">
        <Typography variant="h2" textAlign="center">
          Create account
        </Typography>
        <EditableText
          entity="first name"
          value={firstName}
          editingMode
          setNewValue={setFirstName}
          outlinedVariant
        />
        <EditableText
          entity="last name"
          value={lastName}
          editingMode
          setNewValue={setLastName}
          outlinedVariant
        />
        <ButtonContained
          disabled={!firstName || !lastName}
          clickHandler={handleCreateUser}
          text="Let's go!"
        />
      </CardLayout>
    </AnimatedContainer>
  );
}

export default CreateUser;
