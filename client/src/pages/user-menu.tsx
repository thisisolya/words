import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { setPreferredLanguage, setCardLanguages } from '../store/slices/card-slice';
import useUserInfo from '../hooks/use-user-info';
import useCardsList from '../hooks/use-cards-list';
import { Card as CardType } from '../types';

import ButtonContained from '../components/shared/button-contained';
import Container from '../components/shared/container';
import Card from '../components/shared/card';

interface LanguageOptionsProps {
  cardsList: CardType[],
  clickHandler:({ firstLanguage, secondLanguage }:
  { firstLanguage: string; secondLanguage: string; }) => void,
}

function LanguageOptions({ cardsList, clickHandler }: LanguageOptionsProps) {
  const languageKeys = cardsList?.map((card) => Object.keys(card).filter((key) => (
    key !== 'userId' && key !== 'cardId')));

  const DeEng = languageKeys?.map((keyPair) => (keyPair[0] === 'german' || keyPair[1] === 'german') && (keyPair[0] === 'english' || keyPair[1] === 'english')).includes(true);
  const DeRu = languageKeys?.map((keyPair) => (keyPair[0] === 'german' || keyPair[1] === 'german') && (keyPair[0] === 'russian' || keyPair[1] === 'russian')).includes(true);
  const EngRu = languageKeys?.map((keyPair) => (keyPair[0] === 'english' || keyPair[1] === 'english') && (keyPair[0] === 'russian' || keyPair[1] === 'russian')).includes(true);
  const options = [
    {
      firstLanguage: 'german',
      secondLanguage: 'english',
      isPresent: DeEng,
    },
    {
      firstLanguage: 'german',
      secondLanguage: 'russian',
      isPresent: DeRu,
    },
    {
      firstLanguage: 'english',
      secondLanguage: 'russian',
      isPresent: EngRu,
    },
  ];
  return (
    <Grid container gap={2} justifyContent="center">
      {options.map((option) => option.isPresent
     && (
     <Card size="small" key={React.useId()}>
       <div
         aria-hidden
         onClick={() => clickHandler({
           firstLanguage: option.firstLanguage,
           secondLanguage: option.secondLanguage,
         })}
         style={{ cursor: 'pointer' }}
       >
         <Typography textAlign="center" fontWeight="bold">
           Practice
         </Typography>
         <Typography>
           {_.upperFirst(option.firstLanguage)}
           {' '}
           &ndash;
           {' '}
           {_.upperFirst(option.secondLanguage)}
         </Typography>
       </div>
     </Card>
     ))}
    </Grid>
  );
}

function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedUser = useUserInfo();
  const cardsList = useCardsList();

  const clickHandler = ({ firstLanguage, secondLanguage }:
  { firstLanguage: string, secondLanguage: string }) => {
    navigate(`/cards/${selectedUser?.id}`);
    dispatch(setPreferredLanguage(firstLanguage));
    dispatch(setCardLanguages([firstLanguage, secondLanguage]));
  };

  if (!cardsList || !selectedUser) return null;

  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        Welcome,
        {' '}
        {selectedUser.firstName}
        !
      </Typography>
      <Typography textAlign="center">What would you like to do?</Typography>
      <LanguageOptions cardsList={cardsList} clickHandler={clickHandler} />
      <Grid container gap={2} justifyContent="center">
        <ButtonContained
          text="Add card"
          clickHandler={() => navigate('/cards/create')}
        />
        <ButtonContained
          text="Settings"
          clickHandler={() => navigate('/user/settings')}
        />
      </Grid>
    </Container>
  );
}

export default UserMenu;
