import React from 'react';
import { Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useEditUserInfoMutation, useDeleteUserMutation } from '../../store/apis/user-api';
import { selectedUserSelector } from '../../store/selectors/user';
import { allCardsSelector } from '../../store/selectors/cards';

import useAlert from '../../hooks/useAlert';
import useLogout from '../../hooks/useLogout';
import useModal from '../../hooks/useModal';
import { Card } from '../../types';

import AnimatedContainer from '../../components/AnimatedContainer';
import ButtonContained from '../../components/ButtonContained';
import CardLayout from '../../components/CardLayout';
import EditableText from '../../components/EditableText';
import Toolbar from '../../components/ToolBar';

function Settings() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { showModal } = useModal();
  const { logout } = useLogout();
  const selectedUser = useSelector(selectedUserSelector);
  const allCards = useSelector(allCardsSelector) as Card[];
  const { firstName, lastName, id: userId } = selectedUser || {};

  const [editingMode, setEdidingMode] = React.useState(false);
  const [editedFirstName, setEdiditedFirstName] = React.useState(firstName || '');
  const [editedLastName, setEdiditedLastName] = React.useState(lastName || '');

  const [editUserInfo, { data: editResult }] = useEditUserInfoMutation();
  const [deleteUser, { data: deleteResult }] = useDeleteUserMutation();

  React.useEffect(() => {
    if (editResult) {
      if (editResult.modifiedCount === 1) {
        showAlert({
          text: 'Info was sucessfullly edited!',
          severity: 'success',
        });
        navigate('/user/settings');
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
      setEdidingMode(false);
    }
  }, [editResult]);

  React.useEffect(() => {
    if (deleteResult) {
      if (deleteResult.deletedCount === 1) {
        logout();
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
    }
  }, [deleteResult]);

  React.useEffect(() => {
    if (!selectedUser) {
      navigate('/');
    }
  }, [selectedUser]);

  const handleModeChange = React.useCallback(() => {
    setEdidingMode(!editingMode);
  }, [editingMode]);

  const handleCardEdit = React.useCallback(() => {
    editUserInfo({ userId, editedFirstName, editedLastName }).unwrap();
  }, [userId, editedFirstName, editedLastName]);

  const deleteUserFunction = React.useCallback(() => {
    deleteUser({ userId }).unwrap();
  }, [userId]);

  const handleUserDelete = React.useCallback(() => {
    showModal({
      text: ' This is going to delete your account forever and you will not be able to restore it.',
      acceptFunction: () => deleteUserFunction,
    });
  }, []);

  return (
    <AnimatedContainer>
      <CardLayout size="medium">
        <Typography variant="h2" mb={1}>
          Change user info
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>First name:</Typography>
          {editingMode ? (
            <EditableText
              value={editedFirstName}
              setNewValue={setEdiditedFirstName}
            />
          ) : (
            <Typography>{editedFirstName}</Typography>
          )}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>Last name:</Typography>
          {editingMode ? (
            <EditableText
              value={editedLastName}
              setNewValue={setEdiditedLastName}
            />
          ) : (
            <Typography>{editedLastName}</Typography>
          )}
        </Stack>

        <Typography>
          Total cards count:
          {' '}
          {allCards.length}
        </Typography>
        <Toolbar
          editingMode={editingMode}
          handleModeChange={handleModeChange}
          handleCardEdit={handleCardEdit}
        />
      </CardLayout>
      <ButtonContained
        clickHandler={() => handleUserDelete()}
        text="Delete user"
      />
    </AnimatedContainer>
  );
}

export default Settings;
