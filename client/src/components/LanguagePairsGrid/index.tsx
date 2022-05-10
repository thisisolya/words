import React from 'react';
import { Typography, Grid } from '@mui/material';
import _ from 'lodash';
import { last, head } from 'ramda';
import CardLayout from '../CardLayout';
import { SUPPORTED_LANGUAGES as supportedLanguages } from '../../helpers/constats';

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
          key={`${head(pair)}-${last(pair)}`}
          onClick={() => clickHandler(pair)}
          style={{ cursor: 'pointer' }}
        >
          <CardLayout size="small">
            <Typography textAlign="center" fontWeight="bold">
              Practice
            </Typography>
            <Typography>
              {`${_.upperFirst(supportedLanguages[head(pair) as keyof typeof supportedLanguages])} – 
              ${_.upperFirst(supportedLanguages[last(pair) as keyof typeof supportedLanguages])}`}
            </Typography>
          </CardLayout>
        </div>
      ))}
    </Grid>
  );
}

export default LanguageOptions;
