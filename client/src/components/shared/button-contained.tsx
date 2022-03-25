import React from 'react';
import { Button } from '@mui/material';

interface ButtonProps {
  disabled?: boolean;
  clickHandler: () => void;
  text: string;
}

function ButtonContained({
  disabled,
  clickHandler,
  text,
}: ButtonProps) {
  return (
    <Button variant="contained" onClick={clickHandler} disabled={disabled}>
      {text}
    </Button>
  );
}

export default ButtonContained;
