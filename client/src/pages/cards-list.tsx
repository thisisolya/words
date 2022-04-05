import React from 'react';
import { Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

import useCardsList from '../hooks/use-cards-list';

import ButtonContained from '../components/shared/button-contained';
import CardContainer from '../components/card/container';
import Container from '../components/shared/container';
import IconButton from '../components/shared/icon-button';
import LanguagesSwitcher from '../components/card/language-switcher';
import WordCard from '../components/card/word-card';

function EmptyCardList() {
  const navigate = useNavigate();
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

function CardsList() {
  const navigate = useNavigate();
  const cards = useCardsList();

  const [currentCardNumber, setCurrentCardNumber] = React.useState(0);
  const [paginateForwards, setPaginateForwards] = React.useState(true);

  const handlePagination = (direction: number) => {
    setCurrentCardNumber(currentCardNumber + direction);
    setPaginateForwards(direction === 1);
  };

  if (!cards || cards.length === 0) {
    return <EmptyCardList />;
  }

  return (
    <Container>
      <LanguagesSwitcher languages={Object.keys(cards[currentCardNumber])} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          disabled={currentCardNumber === 0}
          clickHandler={() => handlePagination(-1)}
          Icon={ArrowBackIosIcon}
        />
        <CardContainer
          paginateForwards={paginateForwards}
          cardId={currentCardNumber}
        >
          <WordCard
            currentCard={cards[currentCardNumber]}
            currentCardNumber={currentCardNumber}
            setCurrentCardNumber={setCurrentCardNumber}
          />
        </CardContainer>
        <IconButton
          disabled={currentCardNumber === cards.length - 1}
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
