import { Button, Stack, styled, TextField, Typography } from "@mui/material";
import React from "react";

const Container = styled(Stack)({
  paddingTop: "10vh",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

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
