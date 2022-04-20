import React from 'react';
import { Stack } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';

import Autocomplete from '../autocomplete';
import LanguageSelector from './language-selector';

interface EditableWordsProps {
  words: Record<string, string>[],
  actionType: ActionCreatorWithPayload<Record<string, string>, string>
}

function EditableWords({ words, actionType }: EditableWordsProps) {
  const getLanguageInfo = (word: string) => allLanguages.find((obj) => obj.full === word);
  const getIndex = (index: number) => (index ? 'second' : 'first');

  return (
    <Stack spacing={3} m={3}>
      { words.map((word, index) => (
        <div key={word[0]}>
          <LanguageSelector
            languageNumber={getIndex(index)}
            specificLanguage={getLanguageInfo(word[0])}
            actionType={actionType}
          />
          <Autocomplete
            languageNumber={getIndex(index)}
            language={word[0]}
            actionType={actionType}
            disabled={false}
            value={word[1]}
            variant="standard"
          />
        </div>
      ))}
    </Stack>
  );
}

export default EditableWords;
