import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  head, includes, keys, map, omit, pipe, reverse,
} from 'ramda';

import {
  useGetAllCardsQuery,
} from '../../store/apis/card-api';
import {
  getAllCards,
  resetCurrentCardNumber,
  setPreferredLanguage,
  setSelectedCards,
  setSelectedLanguages,
} from '../../store/slices/card-slice';
import { selectedUserSelector } from '../../store/selectors/user';
import { User } from '../../types';

import AnimatedContainer from '../../components/AnimatedContainer';
import ButtonContained from '../../components/ButtonContained';
import LanguageOptions from '../../components/LanguagePairsGrid';
import { setSelectedUserId } from '../../store/slices/user-slice';
import { allLanguagePairsSelector } from '../../store/selectors/cards';

function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allLanguagePairs = useSelector(allLanguagePairsSelector) as any;
  const selectedUser = useSelector(selectedUserSelector) as any;
  console.log(allLanguagePairs);

  React.useEffect(() => {
    if (!selectedUser) {
      dispatch(setSelectedUserId({ id: selectedUser.id }));
    }
  }, []);

  React.useEffect(() => {
    if (selectedUser) {
      dispatch(getAllCards());
    }
  }, [selectedUser]);
  // const { data: allCardsList } = useGetAllCardsQuery({ userId: selectedUser?.id });

  // const [languagesPairs, setLanguagePairs] = React.useState<string[][]>([]);
  // const uniqueLanguagePairs: string[][] = [];

  // React.useEffect(() => {
  //   if (allCardsList) {
  //     pipe(
  //       map(
  //         ((card) => keys(omit(['_id', 'user_id'], card))),
  //       ),
  //       map(
  //         ((pair) => !includes(pair as string[])(uniqueLanguagePairs)
  //           && !includes(reverse(pair as string[]))(uniqueLanguagePairs)
  //           && uniqueLanguagePairs.push(pair as string[])),
  //       ),
  //     )(allCardsList);
  //     setLanguagePairs(uniqueLanguagePairs);
  //   }
  // }, [allCardsList]);

  // const handleLanguagesSelection = React.useCallback((languages: string[]) => {
  //   dispatch(setSelectedCards({}));
  //   dispatch(setPreferredLanguage(head(languages)));
  //   dispatch(setSelectedLanguages(languages));
  //   navigate('cards');
  // }, [userId]);

  // React.useEffect(() => {
  //   if (!userId) {
  //     navigate('/');
  //   } else if (!selectedUser) {
  //     dispatch(setSelectedUserId({ id: userId }));
  //   }
  //   dispatch(resetCurrentCardNumber());
  // }, []);

  // const text = allLanguagePairs.length
  //   ? 'What would you like to do?'
  //   : "You don't have any cards yet. Would you like to add some?";
  console.log(allLanguagePairs);

  return (
    <AnimatedContainer>
      {/* <Typography variant="h2" textAlign="center">
        {`Welcome, ${selectedUser?.firstName}!`}
      </Typography>
      <Typography textAlign="center">{text}</Typography>
      <LanguageOptions
        languagesPairs={allLanguagePairs}
        clickHandler={handleLanguagesSelection}
      />
      <Grid container gap={2} justifyContent="center">
        <ButtonContained
          text="Add card"
          clickHandler={() => navigate('cards/create')}
        />
        <ButtonContained
          text="Settings"
          clickHandler={() => navigate('settings')}
        />
      </Grid> */}
    </AnimatedContainer>
  );
}

export default UserMenu;
