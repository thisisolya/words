import React from 'react';
import { Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from './icon-button';

interface CardToolbarProps {
  editingMode: boolean;
  handleCardDelete?: () => void;
  handleCardEdit: () => void;
  handleModeChange: () => void;
}

function CardToolbar({
  editingMode,
  handleCardDelete,
  handleCardEdit,
  handleModeChange,
}: CardToolbarProps) {
  if (editingMode) {
    return (
      <Stack direction="row" justifyContent="end">
        <IconButton clickHandler={handleCardEdit} Icon={CheckIcon} />
        <IconButton clickHandler={handleModeChange} Icon={CloseOutlinedIcon} />
      </Stack>
    );
  }

  return (
    <Stack direction="row" justifyContent="end">
      {handleCardDelete && (
        <IconButton
          clickHandler={handleCardDelete}
          Icon={DeleteOutlineIcon}
        />
      )}
      <IconButton clickHandler={handleModeChange} Icon={EditIcon} />
    </Stack>
  );
}

export default CardToolbar;
