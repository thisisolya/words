import React from 'react';
import { Stack } from '@mui/material';

import { setEditedCard } from '../../store/slices/card-slice';
import { SUPPORTED_LANGUAGES as allLanguages } from '../../helpers/constats';

import Autocomplete from '../autocomplete';
import LanguageSelector from './language-selector';

interface EditableWordsProps {
  editableObjects : {
    language: string,
    value: string,
    index:string,
  }[]
}

function EditableWords({ editableObjects }: EditableWordsProps) {
  const getLanguageInfo = (word: string) => allLanguages.find((obj) => obj.full === word);

  return (
    <Stack spacing={3} m={3}>
      { editableObjects.map((object) => (
        <div key={object.index}>
          <LanguageSelector
            languageNumber={object.index}
            specificLanguage={getLanguageInfo(object.language)}
            actionType={setEditedCard}
          />
          <Autocomplete
            languageNumber={object.index}
            language={object.language}
            actionType={setEditedCard}
            disabled={false}
            value={object.value}
            variant="standard"
          />
        </div>
      ))}
    </Stack>
  );
}

export default EditableWords;
