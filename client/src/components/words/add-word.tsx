import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import Container from "../../shared/container";
import { useSelector } from "react-redux";

const AddWord = () => {
  const [russianWord, setRussianWord] = React.useState("");
  const [englishWord, setEnglishWord] = React.useState("");
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
    }).then(() => console.log("lala"));
  };
  return (
    <Container>
      <Typography variant="h2">Add new word</Typography>
      <TextField
        type="text"
        label="Russian"
        id="russian-word-input"
        value={russianWord}
        onChange={(e) => setRussianWord(e.target.value)}
      />
      <TextField
        type="text"
        label="English"
        id="english-word-input"
        value={englishWord}
        onChange={(e) => setEnglishWord(e.target.value)}
      />
      <Button type="submit" variant="contained" onClick={handleClick}>
        add
      </Button>
    </Container>
  );
};

export default AddWord;
