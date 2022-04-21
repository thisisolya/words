import React from 'react';
import { Typography, Grid } from '@mui/material';
import _ from 'lodash';
import CardLayout from '../CardLayout';

interface LanguageOptionsProps {
  languagesPairs: string[][];
  clickHandler: (languages: string[]) => void;
}

function LanguageOptions({ languagesPairs, clickHandler }: LanguageOptionsProps) {
  return (
    <Grid container gap={2} justifyContent="center">
      {languagesPairs.map((pair) => (
        <div
          aria-hidden
          key={`${pair[0]}-${pair[1]}`}
          onClick={() => clickHandler(pair)}
          style={{ cursor: 'pointer' }}
        >
          <CardLayout size="small">
            <Typography textAlign="center" fontWeight="bold">
              Practice
            </Typography>
            <Typography>
              {_.upperFirst(pair[0])}
              {' '}
              &ndash;
              {' '}
              {_.upperFirst(pair[1])}
            </Typography>
          </CardLayout>
        </div>
      ))}
    </Grid>
  );
}

export default LanguageOptions;
