import React from 'react';
import { TextField, Typography, Stack } from '@mui/material';
import _ from 'lodash';
import styled from '@emotion/styled';

type EditableTextProps = {
  entity: string;
  editingMode: boolean;
  outlinedVariant?: boolean;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

const CustomizedTextfield = styled(TextField)`
  flex: ${(props) => props.variant && 1}
`;

function EditableText({
  editingMode,
  entity,
  outlinedVariant,
  setNewValue,
  value,
}: EditableTextProps) {
  const label = _.upperFirst(entity);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {!outlinedVariant && <Typography>{`${label}:`}</Typography>}
      { editingMode
        ? (
          <CustomizedTextfield
            label={outlinedVariant && label}
            onChange={(e) => setNewValue(e.target.value)}
            variant={outlinedVariant ? 'outlined' : 'standard'}
            value={value}
          />
        )
        : <Typography>{value}</Typography>}
    </Stack>
  );
}

export default EditableText;
