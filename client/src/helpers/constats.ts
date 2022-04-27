import allRussianWords from './ru_words.json';
import allEnglishWords from './en_words.json';
import allGermanWords from './de_words.json';

const SUPPORTED_LANGUAGES = {
  de: 'german',
  eng: 'english',
  ru: 'russian',
};

const AUTOCOMPLETE_OPTIONS = {
  eng: allEnglishWords as string[],
  ru: allRussianWords,
  de: allGermanWords,
};

export { AUTOCOMPLETE_OPTIONS, SUPPORTED_LANGUAGES };
