import React from 'react';
import { Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '../store';
import { useDeleteUserMutation, useEditUserInfoMutation } from '../store/apis/user-api';
import { selectedUserSelector } from '../store/selectors/user';

import useAlert from '../hooks/use-alert';
import useModal from '../hooks/use-modal';
import useLogout from '../hooks/use-logout';

import EditableText from '../components/shared/editable-text';
import CardLayout from '../components/CardLayout';
import CardToolbar from '../components/shared/card-toolbar';
import Container from '../components/shared/container';
import ButtonContained from '../components/shared/button-contained';

function Settings() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { showModal } = useModal();
  const { logout } = useLogout();
  const selectedUser = useSelector(selectedUserSelector);

  const [editingMode, setEdidingMode] = React.useState(false);
  const [editedFirstName, setEdiditedFirstName] = React.useState(
    selectedUser?.firstName || '',
  );
  const [editedLastName, setEdiditedLastName] = React.useState(
    selectedUser?.lastName || '',
  );
  const userId = useSelector((state: AppState) => state.user.selectedUser?.id)
    || localStorage.getItem('userId');

  const [editUserInfo, { data: editResult }] = useEditUserInfoMutation();
  const [deleteUser, { data: deleteResult }] = useDeleteUserMutation();

  const handleModeChange = () => {
    setEdidingMode(!editingMode);
    setEdiditedFirstName(selectedUser?.firstName || '');
    setEdiditedLastName(selectedUser?.lastName || '');
  };

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

  const handleCardEdit = () => {
    editUserInfo({ userId, editedFirstName, editedLastName }).unwrap();
  };

  const deleteUserFunction = () => {
    deleteUser({ userId }).unwrap();
  };

  const handleUserDelete = () => {
    showModal({
      text: ' This is going to delete your account forever and you will not be able to restore it.',
      acceptFunction: () => deleteUserFunction,
    });
  };

  return (
    <Container>
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
          {selectedUser?.cards?.length}
        </Typography>
        <CardToolbar
          editingMode={editingMode}
          handleModeChange={handleModeChange}
          handleCardEdit={handleCardEdit}
        />
      </CardLayout>
      <ButtonContained
        clickHandler={() => handleUserDelete()}
        text="Delete user"
      />
    </Container>
  );
}

export default Settings;
