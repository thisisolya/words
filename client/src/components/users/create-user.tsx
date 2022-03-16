import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import Card from "../../shared/card";

const CreateUser = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8080/user/create", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({ firstName, lastName }),
    }).then((result) => {
      if (result.status === 200) {
        navigate("/");
      } else {
        enqueueSnackbar("Something went wrong:(", { variant: "error" });
      }
    });
  };

  return (
    <Card size="medium">
      <Typography variant="h1">Create account</Typography>
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
        onClick={handleClick}
        disabled={!firstName || !lastName}
      >
        Let's go!
      </Button>
    </Card>
  );
};

export default CreateUser;
