import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useEditUserInfoMutation, useDeleteUserMutation } from '../../store/apis/user-api';
import { selectedUserSelector } from '../../store/selectors/user';
import { allCardsSelector } from '../../store/selectors/cards';

import useLogout from '../../hooks/useLogout';
import { User } from '../../types';

import AnimatedContainer from '../../components/AnimatedContainer';
import ButtonContained from '../../components/ButtonContained';
import CardLayout from '../../components/CardLayout';
import EditableText from '../../components/EditableText';
import Toolbar from '../../components/ToolBar';

function Settings() {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const selectedUser = useSelector(selectedUserSelector) as User;
  const allCards = useSelector(allCardsSelector) as number;
  const { firstName, lastName, id: userId } = selectedUser || {};

  const [editingMode, setEdidingMode] = React.useState(false);
  const [editedFirstName, setEdiditedFirstName] = React.useState(firstName || '');
  const [editedLastName, setEdiditedLastName] = React.useState(lastName || '');

  const [editUserInfo] = useEditUserInfoMutation();
  const [deleteUser] = useDeleteUserMutation();

  React.useEffect(() => {
    if (!selectedUser) {
      navigate('/');
    }
  }, [selectedUser]);

  const toggleMode = React.useCallback(() => {
    setEdidingMode(!editingMode);
  }, [editingMode]);

  const handleUserEditing = React.useCallback(() => {
    editUserInfo({ userId, editedFirstName, editedLastName }).unwrap();
    // .then((result) => {
    //   if (result.modifiedCount) {
    //     showAlert({ text: 'Info has been sucessfullly edited!', severity: 'success' });
    //   } else showAlert({ text: 'Info has not been edited:(', severity: 'error' });
    // })
    // .catch((error) => error && showAlert({ text: 'Something went wrong:(', severity: 'error' }))
    // .finally(() => setEdidingMode(false));
  }, [userId, editedFirstName, editedLastName]);

  const handleUserDelete = React.useCallback(() => {
    const deleteFunction = () => deleteUser({ userId }).unwrap();
    //   .then((result) => {
    //     if (result.deletedCount) {
    //       logout();
    //     } else showAlert({ text: 'User has not been deleted:(', severity: 'error' });
    //   })
    //   .catch((error) => error && showAlert
    // ({ text: 'Something went wrong:(', severity: 'error' }));
    // showModal({
    //   text: ' This is going to delete
    // your account forever and you will not be able to restore it.',
    //   acceptFunction: () => deleteFunction,
    // });
  }, [userId]);

  return (
    <AnimatedContainer>
      <CardLayout size="medium">
        <Typography variant="h2" mb={1} textAlign="center">
          Change user info
        </Typography>
        <EditableText
          entity="first name"
          value={editedFirstName}
          editingMode={editingMode}
          setNewValue={setEdiditedFirstName}
        />
        <EditableText
          entity="last name"
          editingMode={editingMode}
          value={editedLastName}
          setNewValue={setEdiditedLastName}
        />
        <Typography>
          {`Total cards count: ${allCards}`}
        </Typography>
        <Toolbar
          editingMode={editingMode}
          handleModeChange={toggleMode}
          handleCardEdit={handleUserEditing}
        />
      </CardLayout>
      <ButtonContained
        clickHandler={handleUserDelete}
        text="Delete user"
      />
    </AnimatedContainer>
  );
}

export default Settings;
