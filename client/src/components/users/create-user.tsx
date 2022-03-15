import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import FormBase from "../../shared/form-base";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateUser = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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
    }).then((result) => {
      if (result.status === 200) {
        navigate("/");
      } else {
        enqueueSnackbar("Something went wrong:(", { variant: "error" });
      }
    });
  };

  const handleInput = (e: any, field: any) => {
    e.preventDefault();
    field(e.target.value);
  };

  return (
    <FormBase>
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
    </FormBase>
  );
};

export default CreateUser;
