import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import Card from "../../shared/card";

const AddWord = () => {
  const [russianWord, setRussianWord] = React.useState("");
  const [englishWord, setEnglishWord] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  const userId =
    useSelector((state: any) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const handleClick = () => {
    fetch("http://localhost:8080/cards/create", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({ userId, russianWord, englishWord }),
    }).then((result) => {
      if (result.status === 200) {
        setRussianWord("");
        setEnglishWord("");
        enqueueSnackbar("Word was sucessfullly added!", { variant: "success" });
      } else {
        enqueueSnackbar("Something went wrong:(", { variant: "error" });
      }
    });
  };

  return (
    <Card size="medium">
      <Typography variant="body1" textAlign={"center"}>
        Please type a word in Russian and its equivalent in English and hit
        "submit"
      </Typography>
      <TextField
        type="text"
        label="Russian"
        value={russianWord}
        onChange={(e) => setRussianWord(e.target.value)}
      />
      <TextField
        type="text"
        label="English"
        value={englishWord}
        onChange={(e) => setEnglishWord(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={!englishWord || !russianWord}
      >
        Submit
      </Button>
    </Card>
  );
};

export default AddWord;
