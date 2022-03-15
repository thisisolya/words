import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import Container from "../../shared/container";
import { useSelector } from "react-redux";
import FormBase from "../../shared/form-base";
import { useSnackbar } from "notistack";

const AddWord = () => {
  const [russianWord, setRussianWord] = React.useState("");
  const [englishWord, setEnglishWord] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  const userId =
    useSelector((state: any) => state.users.selectedUser?.id) ||
    localStorage.getItem("userId");

  const handleClick = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8080/cards/add", {
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
    <>
      <FormBase>
        <Typography variant="body1" textAlign={"center"}>
          Please type a word in Russian and its equivalent in a foreign language
          of your choice and hit "submit"
        </Typography>
        <TextField
          type="text"
          label="Russian"
          value={russianWord}
          onChange={(e) => setRussianWord(e.target.value)}
        />
        <TextField
          type="text"
          label="Translation"
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
      </FormBase>
    </>
  );
};

export default AddWord;
