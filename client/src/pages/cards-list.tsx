import React from 'react';
import { Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import useCardsList from '../hooks/use-cards-list';
import { AppState } from '../store';

import ButtonContained from '../components/shared/button-contained';
import CardContainer from '../components/card/container';
import Container from '../components/shared/container';
import IconButton from '../components/shared/icon-button';
import LanguagesSwitcher from '../components/card/language-switcher';
import CardWords from '../components/card/card-words';
import { Card } from '../types';

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
  const cardsList = useCardsList();
  const navigate = useNavigate();

  const [currentCardNumber, setCurrentCardNumber] = React.useState(0);
  const [paginateForwards, setPaginateForwards] = React.useState(true);
  const [cards, setCards] = React.useState<Card[]>([]);
  const selectedLanguages = useSelector((state: AppState) => state.card.selectedLanguages);

  React.useEffect(() => {
    if (selectedLanguages.length === 0) {
      navigate('/');
    }
  }, []);

  React.useEffect(() => {
    const selectedCards: Card[] = [];
    cardsList?.map((card) => (
      Object.keys(_.pick(card, [selectedLanguages[0], selectedLanguages[1]])).length === 2
      && selectedCards.push(card)));
    setCards(selectedCards);
  }, [cardsList]);

  React.useEffect(() => {
    if (currentCardNumber > 0) {
      setCurrentCardNumber(currentCardNumber - 1);
    }
  }, [cards?.length]);

  const handlePagination = (direction: number) => {
    setCurrentCardNumber(currentCardNumber + direction);
    setPaginateForwards(direction === 1);
  };

  if (!cards || cards.length === 0) {
    return <EmptyCardList />;
  }

  return (
    <Container>
      <LanguagesSwitcher />
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
          <CardWords
            currentCard={cards[currentCardNumber]}
            currentCardNumber={currentCardNumber}
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
