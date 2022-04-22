import React from 'react';
import { Stack } from '@mui/material';
import AnimatedCardContainer from './AnimatedCardContainer';
import CardLayout from '../CardLayout';
import Toolbar from '../ToolBar';

interface CardProps {
  currentCardNumber: number;
  editingMode: boolean;
  handleCardEdit: () => void;
  handleCardDelete: () => void;
  handleModeChange: () => void;
  paginationDirection: boolean;
  text: JSX.Element;
  toggleLanguage: () => void;
}

function Card({
  currentCardNumber,
  editingMode,
  handleCardDelete,
  handleCardEdit,
  handleModeChange,
  paginationDirection,
  text,
  toggleLanguage,
}: CardProps) {
  return (
    <AnimatedCardContainer
      paginateForwards={paginationDirection}
      cardId={currentCardNumber}
    >
      <CardLayout size="large">
        <Stack
          flex={10}
          onClick={toggleLanguage}
          justifyContent="center"
        >
          {text}
        </Stack>
        <Toolbar
          handleCardDelete={handleCardDelete}
          handleModeChange={handleModeChange}
          handleCardEdit={handleCardEdit}
          editingMode={editingMode}
        />
      </CardLayout>
    </AnimatedCardContainer>
  );
}

export default Card;
