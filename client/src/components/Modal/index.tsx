import React from 'react';
import { Dialog, Typography, Stack } from '@mui/material';
import ButtonContained from '../ButtonContained';
import CardLayout from '../CardLayout';

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
      <CardLayout size="medium">
        <Typography variant="h2">Are you sure?</Typography>
        <Typography>{text}</Typography>
        <Stack direction="row" justifyContent="center" spacing={3}>
          <ButtonContained text="Yes" clickHandler={handleAcceptButton} />
          <ButtonContained text="No" clickHandler={toggleModal} />
        </Stack>
      </CardLayout>
    </Dialog>
  );
}

export default Modal;
