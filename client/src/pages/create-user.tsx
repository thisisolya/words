import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useCreateNewUserMutation } from "../store/api";
import useAlert from "../hooks/use-alert";

import Card from "../components/shared/card";
import Container from "../components/shared/container";

const CreateUser = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [createUser] = useCreateNewUserMutation();

  const handleCreateUser = () => {
    createUser({ firstName, lastName }).then((result: any) => {
      if (result.insertedId !== null) {
        navigate("/");
      } else {
        showAlert({ text: "Something went wrong:(", severity: "error" });
      }
    });
  };

  return (
    <Container>
      <Card size="medium">
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
          Let's go!
        </Button>
      </Card>
    </Container>
  );
};

export default CreateUser;
