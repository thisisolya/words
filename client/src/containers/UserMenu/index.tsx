import React from 'react';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  includes, keys, map, omit, reverse,
} from 'ramda';
import {
  useGetAllCardsQuery,
  useLazyGetSelectedCardsQuery,
} from '../../store/apis/card-api';
import { useGetUserInfoQuery } from '../../store/apis/user-api';
import { selectedUserSelector } from '../../store/selectors/user';
import {
  resetCurrentCardNumber,
  setPreferredLanguage,
  setSelectedLanguages,
} from '../../store/slices/card-slice';

import AnimatedContainer from '../../components/AnimatedContainer';
import ButtonContained from '../../components/ButtonContained';
import LanguageOptions from '../../components/LanguagePairsGrid';

function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const selectedUser = useSelector(selectedUserSelector);

  const { isFetching } = useGetUserInfoQuery({ userId });
  const { data: allCardsList } = useGetAllCardsQuery({ userId: selectedUser?.id });
  const [triggerSelectedCardsFetch, { data: selectedCardsList }] = useLazyGetSelectedCardsQuery();

  const [languagesPairs, setLanguagePairs] = React.useState<string[][]>([]);
  const uniqueLanguagePairs: string[][] = [];

  React.useEffect(() => {
    if (allCardsList) {
      const allLanguagePairs = map(
        ((card) => keys(omit(['_id', 'user_id'], card))),
        allCardsList,
      );
      allLanguagePairs.map((pair) => (
        !includes(pair, uniqueLanguagePairs) && !includes(reverse(pair), uniqueLanguagePairs)
        && uniqueLanguagePairs.push(pair as string[])));
      setLanguagePairs(uniqueLanguagePairs);
    }
  }, [allCardsList]);

  React.useEffect(() => {
    if (selectedCardsList) navigate('cards');
  }, [selectedCardsList]);

  const handleLanguagesSelection = React.useCallback((languages: string[]) => {
    triggerSelectedCardsFetch({ userId, languages });
    dispatch(setPreferredLanguage(languages[0]));
    dispatch(setSelectedLanguages(languages));
  }, []);

  React.useEffect(() => {
    if (!userId) navigate('/');
    dispatch(resetCurrentCardNumber());
  }, []);

  const text = allCardsList && allCardsList.length
    ? 'What would you like to do?'
    : "You don't have any cards yet. Would you like to add some?";

  if (isFetching) return <CircularProgress />;

  return (
    <AnimatedContainer>
      <Typography variant="h2" textAlign="center">
        Welcome,
        {' '}
        {selectedUser?.firstName}
        !
      </Typography>
      <Typography textAlign="center">{text}</Typography>
      {allCardsList && !!allCardsList.length && (
      <LanguageOptions
        languagesPairs={languagesPairs}
        clickHandler={handleLanguagesSelection}
      />
      )}
      <Grid container gap={2} justifyContent="center">
        <ButtonContained
          text="Add card"
          clickHandler={() => navigate('cards/create')}
        />
        <ButtonContained
          text="Settings"
          clickHandler={() => navigate('settings')}
        />
      </Grid>
    </AnimatedContainer>
  );
}

export default UserMenu;
