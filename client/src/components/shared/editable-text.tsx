import React from 'react';
import { TextField } from '@mui/material';

type EditableTextProps = {
  value: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
};

function EditableText({ value, setNewValue }: EditableTextProps) {
  return (
    <TextField
      variant="standard"
      value={value}
      onChange={(e) => setNewValue(e.target.value)}
    />
  );
}

export default EditableText;
