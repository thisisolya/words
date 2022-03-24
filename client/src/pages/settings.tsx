import React from "react";
import { Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { useDeleteUserMutation, useEditUserInfoMutation } from "../store/api";

import EditableText from "../components/shared/editable-text";
import CardToolbar from "../components/shared/card-toolbar";
import Card from "../components/shared/card";
import Container from "../components/shared/container";
import ButtonContained from "../components/shared/button-contained";
import useAlert from "../hooks/use-alert";
import useModal from "../hooks/use-modal";

const Settings = () => {
  const { selectedUser } = useSelector((state: AppState) => state.users);

  const [editingMode, setEdidingMode] = React.useState(false);
  const [editedFirstName, setEdiditedFirstName] = React.useState(
    selectedUser?.firstName || ""
  );
  const [editedLastName, setEdiditedLastName] = React.useState(
    selectedUser?.lastName || ""
  );
  const userId =
    useSelector((state: AppState) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const { showAlert } = useAlert();
  const { showModal } = useModal();
  const navigate = useNavigate();

  const [editUserInfo] = useEditUserInfoMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleModeChange = () => {
    setEdidingMode(!editingMode);
    setEdiditedFirstName(selectedUser?.firstName || "");
    setEdiditedLastName(selectedUser?.lastName || "");
  };

  const handleCardEdit = () => {
    editUserInfo({ userId, editedFirstName, editedLastName }).then(
      (result: any) => {
        if (result.data.modifiedCount === 1) {
          showAlert({
            text: "Info was sucessfullly edited!",
            severity: "success",
          });
          navigate("/user/settings");
        } else {
          showAlert({ text: "Something went wrong:(", severity: "error" });
        }
        setEdidingMode(false);
      }
    );
  };

  const deleteUserFunction = () => {
    deleteUser({ userId }).then((result: any) => {
      if (result.data.deletedCount === 1) {
        navigate("/");
        localStorage.removeItem("userId");
      } else {
        showAlert({ text: "Something went wrong:(", severity: "error" });
      }
    });
  };

  const handleUserDelete = () => {
    showModal({
      text: " This is going to delete your account forever and you will not be able to restore it.",
      acceptFunction: () => deleteUserFunction,
    });
  };

  if (!selectedUser) {
    return <Typography>User info is unknown and cannot be edited.</Typography>;
  }

  return (
    <Container>
      <Card size="medium">
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
          Total cards count: {selectedUser?.cards?.length}
        </Typography>
        <CardToolbar
          editingMode={editingMode}
          handleModeChange={handleModeChange}
          handleCardEdit={handleCardEdit}
        />
      </Card>
      <ButtonContained
        clickHandler={() => handleUserDelete()}
        text="Delete user"
      />
    </Container>
  );
};

export default Settings;
