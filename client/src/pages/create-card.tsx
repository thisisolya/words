import React from 'react';
import { TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useCreateNewCardMutation } from '../store/api';
import { AppState } from '../store';
import useAlert from '../hooks/use-alert';

import ButtonContained from '../components/shared/button-contained';
import Container from '../components/shared/container';
import Card from '../components/shared/card';

function CreateCard() {
  const [russianWord, setRussianWord] = React.useState('');
  const [englishWord, setEnglishWord] = React.useState('');
  const [createCard, { data: creationResult }] = useCreateNewCardMutation();
  const { showAlert } = useAlert();

  const userId = useSelector((state: AppState) => state.users.selectedUser?.id)
    || localStorage.getItem('userId');

  React.useEffect(() => {
    if (creationResult) {
      if (creationResult.insertedId) {
        showAlert({
          text: 'Word was sucessfullly created!',
          severity: 'success',
        });
        setRussianWord('');
        setEnglishWord('');
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
    }
  }, [creationResult]);

  const handleCreateCard = () => {
    createCard({ userId, russianWord, englishWord }).unwrap();
  };

  return (
    <Container>
      <Card size="medium">
        <Typography variant="body1" textAlign="center">
          Please type a word in Russian and its equivalent in English and hit &ldquo;submit&rdquo;
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
        <ButtonContained
          clickHandler={handleCreateCard}
          disabled={!englishWord || !russianWord}
          text="Submit"
        />
      </Card>
    </Container>
  );
}

export default CreateCard;

// .then((result: any) => {
//   if (result.insertedId !== null) {
//     setRussianWord('');
//     setEnglishWord('');
//     showAlert({ text: 'Card was added!', severity: 'success' });
//   } else {
//     showAlert({ text: 'Something went wrong:(', severity: 'error' });
//   }
// });
