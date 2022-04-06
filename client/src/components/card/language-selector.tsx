import React from 'react';
import {
  FormControl, FormControlLabel, RadioGroup, Radio, Typography,
} from '@mui/material';
import styled from '@emotion/styled';

function LanguageSelector({ changeHandler }: { changeHandler: () => void }) {
  return (
    <FormControl>
      <Typography fontWeight={600}>Language</Typography>
      <RadioGroup onChange={changeHandler}>
        <FormControlLabel value="russian" control={<Radio />} label="russian" />
        <FormControlLabel value="english" control={<Radio />} label="english" />
        <FormControlLabel value="german" control={<Radio />} label="german" disabled />
      </RadioGroup>
    </FormControl>
  );
}

export default LanguageSelector;
