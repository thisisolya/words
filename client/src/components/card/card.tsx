import React from 'react';
import { Stack } from '@mui/material';
import CardContainer from '../shared/card';
import CardToolbar from '../shared/card-toolbar';

interface WordCardProps {
  toggleLanguage: () => void;
  text: JSX.Element;
  editingMode: boolean;
  handleCardEdit: () => void;
  handleCardDelete: () => void;
  handleModeChange: () => void;
}

function Card({
  toggleLanguage,
  text,
  editingMode,
  handleCardEdit,
  handleCardDelete,
  handleModeChange,
}: WordCardProps) {
  return (
    <CardContainer size="large">
      <Stack
        flex={10}
        onClick={toggleLanguage}
        justifyContent="center"
      >
        {text}
      </Stack>
      <CardToolbar
        handleCardDelete={handleCardDelete}
        handleModeChange={handleModeChange}
        handleCardEdit={handleCardEdit}
        editingMode={editingMode}
      />
    </CardContainer>
  );
}

export default Card;
