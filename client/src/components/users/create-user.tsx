import React from "react";
import { Button, Input, TextField, Typography } from "@mui/material";
import Container from "../../shared/container";

const CreateUser = () => {
  const [firstName, setFirstName] = React.useState<string>();
  const [lastName, setLastName] = React.useState<string>();

  const handleClick = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8080/user/add", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({ firstName, lastName }),
    }).then(() => console.log("lala"));
  };
  console.log(firstName);

  const handleInput = (e: any, field: any) => {
    e.preventDefault();
    field(e.target.value);
  };

  return (
    <Container>
      <Typography variant="h1">Create account</Typography>
      <TextField
        label="First name"
        onChange={(e) => handleInput(e, setFirstName)}
        value={firstName}
      />
      <TextField
        label="Last name"
        onChange={(e) => handleInput(e, setLastName)}
        value={lastName}
      />
      <Button
        type="submit"
        variant="contained"
        onClick={handleClick}
        disabled={!firstName || !lastName}
      >
        Let's go!
      </Button>
    </Container>
  );
};

export default CreateUser;
