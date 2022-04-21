import React from 'react';
import { Stack } from '@mui/material';
import { SUPPORTED_LANGUAGES as allLanguages } from '../../../helpers/constats';
import Autocomplete from '../../autocomplete';
import LanguagePicker from '../../LanguagePicker';

interface EditableWordsProps {
  words: Record<string, string>[],
  clickHandler: (arg: Record<string, string>) => void,
}

function EditableCardWords({ words, clickHandler }: EditableWordsProps) {
  const getLanguageInfo = (word: string) => allLanguages.find((obj) => obj.full === word);
  const getIndex = (index: number) => (index ? 'second' : 'first');

  return (
    <Stack spacing={3} m={3}>
      { words.map((word, index) => (
        <div key={word[0]}>
          <LanguagePicker
            languageNumber={getIndex(index)}
            specificLanguage={getLanguageInfo(word[0])}
            clickHandler={clickHandler}
          />
          <Autocomplete
            languageNumber={getIndex(index)}
            language={word[0]}
            clickHandler={clickHandler}
            disabled={false}
            value={word[1]}
            variant="standard"
          />
        </div>
      ))}
    </Stack>
  );
}

export default EditableCardWords;
