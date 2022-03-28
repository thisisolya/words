import React from 'react';
import { Stack, Switch, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

import useCardsList from '../hooks/use-cards-list';

import Container from '../components/shared/container';
import WordCard from '../components/word-card';
import IconButton from '../components/shared/icon-button';
import ButtonContained from '../components/shared/button-contained';

function LanguagesSwitcher({
  switchFirstLanguage,
}: {
  switchFirstLanguage: () => void;
}) {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" mb={1}>
      <Typography variant="body2">Russian first</Typography>
      <Switch size="small" color="primary" onChange={switchFirstLanguage} />
      <Typography variant="body2">English first</Typography>
    </Stack>
  );
}

function CardsList() {
  const navigate = useNavigate();
  const cards = useCardsList();

  const [currentCardNumber, setCurrentCardNumber] = React.useState(0);
  const [language, setLanguage] = React.useState('russian');
  const [paginateForwards, setPaginateForwards] = React.useState(true);

  const transitionInitialValue = paginateForwards ? '100%' : '-100%';
  const transitionExitValue = paginateForwards ? '-100%' : '100%';

  const isLastWord = cards && currentCardNumber === cards.length - 1;
  const isFirstWord = currentCardNumber === 0;

  const toggleLanguage = () => {
    setLanguage(language === 'russian' ? 'english' : 'russian');
  };

  const handlePagination = (direction: number) => {
    setCurrentCardNumber(currentCardNumber + direction);
    setPaginateForwards(direction === 1);
  };

  if (!cards || cards.length === 0) {
    return (
      <Container>
        <Stack spacing={3}>
          <Typography>
            You have no cards yet. Woud you like to add some?
          </Typography>
          <ButtonContained
            text="Create card"
            clickHandler={() => navigate('/cards/create')}
          />
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
      <LanguagesSwitcher switchFirstLanguage={toggleLanguage} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          disabled={!!isFirstWord}
          clickHandler={() => handlePagination(-1)}
          Icon={ArrowBackIosIcon}
        />
        <WordCard
          currentCard={cards[currentCardNumber]}
          language={language}
          currentCardNumber={currentCardNumber}
          setCurrentCardNumber={setCurrentCardNumber}
          transitionInitialValue={transitionInitialValue}
          transitionExitValue={transitionExitValue}
        />
        <IconButton
          disabled={!!isLastWord}
          clickHandler={() => handlePagination(1)}
          Icon={ArrowForwardIosIcon}
        />
      </Stack>
      <ButtonContained
        text="Create card"
        clickHandler={() => navigate('/cards/create')}
      />
    </Container>
  );
}

export default CardsList;
