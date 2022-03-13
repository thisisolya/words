import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import Container from "../../shared/container";

const CreateUser = () => {
  return (
    <Container>
      <Typography variant="h1">Create account</Typography>
      <TextField type="text" label="First name" id="first-name-input" />
      <TextField type="text" label="Last name" id="last-name-input" />
      <Button type="submit" variant="contained">
        Let's go!
      </Button>
    </Container>
  );
};

export default CreateUser;
