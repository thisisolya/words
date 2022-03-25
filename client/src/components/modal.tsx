import React from 'react';
import { Dialog, Typography, Stack } from '@mui/material';
import Card from './shared/card';
import ButtonContained from './shared/button-contained';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  text: string;
  acceptButtonHandler: () => void;
}

function Modal({
  isOpen,
  text,
  toggleModal,
  acceptButtonHandler,
}: ModalProps) {
  const handleAcceptButton = () => {
    acceptButtonHandler();
    toggleModal();
  };

  return (
    <Dialog open={isOpen} onClose={toggleModal}>
      <Card size="medium">
        <Typography variant="h2">Are you sure?</Typography>
        <Typography>{text}</Typography>
        <Stack direction="row" justifyContent="center" spacing={3}>
          <ButtonContained text="Yes" clickHandler={handleAcceptButton} />
          <ButtonContained text="No" clickHandler={toggleModal} />
        </Stack>
      </Card>
    </Dialog>
  );
}

export default Modal;
