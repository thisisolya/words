import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  omit, keys, filter, map, includes, reverse,
} from 'ramda';
import _ from 'lodash';

import {
  setPreferredLanguage,
  setSelectedCards as saveSelectedCards,
  setSelectedLanguages,
} from '../store/slices/card-slice';
import { allCardsSelector } from '../store/selectors/cards';
import { Card as CardType } from '../types';

import Card from './shared/card';

function LanguageOptions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cards = useSelector(allCardsSelector);
  const [languagesPairs, setLanguagePairs] = React.useState<string[][]>([]);
  const uniqueLanguagePairs: string[][] = [];

  const getLanguageKeys = (obj: CardType) => keys(omit(['userId', 'cardId'], obj));

  React.useEffect(() => {
    if (cards) {
      const keyPairs = map(getLanguageKeys, cards);
      keyPairs.map((pair) => !includes(pair, uniqueLanguagePairs)
      && !includes(reverse(pair), uniqueLanguagePairs)
      && uniqueLanguagePairs.push(pair));
      setLanguagePairs(uniqueLanguagePairs);
    }
  }, [cards]);

  if (!cards) {
    return (
      <Typography>You haven&apos;t added any cards yet.</Typography>
    );
  }

  const clickHandler = (languages: string[]) => {
    const getSelectedCards = (card: CardType) => (
      includes(languages, [getLanguageKeys(card)])
       || includes(reverse(languages), [getLanguageKeys(card)]));
    const selectedCards = filter(getSelectedCards, cards);

    dispatch(setPreferredLanguage(languages[0]));
    dispatch(setSelectedLanguages(languages));
    dispatch(saveSelectedCards(selectedCards));
    navigate('cards');
  };

  return (
    <Grid container gap={2} justifyContent="center">
      {languagesPairs.map((pair) => (
        <div
          aria-hidden
          key={`${pair[0]}-${pair[1]}`}
          onClick={() => clickHandler(pair)}
          style={{ cursor: 'pointer' }}
        >
          <Card size="small">
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
          </Card>
        </div>
      ))}
    </Grid>
  );
}

export default LanguageOptions;