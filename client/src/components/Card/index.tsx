import React from 'react';
import { Stack } from '@mui/material';
import AnimatedCardContainer from './AnimatedCardContainer';
import CardLayout from '../CardLayout';
import Toolbar from '../ToolBar';
import EditableCardWords from '../../containers/EditableCardWords';
import ReadonlyCardWords from '../../containers/ReadonlyCardWords';

interface CardProps {
  currentCardNumber: number;
  editingMode: boolean;
  handleCardEdit: () => void;
  handleCardDelete: () => void;
  handleModeChange: () => void;
  paginationDirection: boolean;
}

function Card({
  currentCardNumber,
  editingMode,
  handleCardDelete,
  handleCardEdit,
  handleModeChange,
  paginationDirection,
}: CardProps) {
  return (
    <AnimatedCardContainer
      paginateForwards={paginationDirection}
      cardId={currentCardNumber}
    >
      <CardLayout size="large">
        <Stack
          flex={10}
          justifyContent="center"
        >
          {editingMode
            ? <EditableCardWords />
            : <ReadonlyCardWords />}
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
