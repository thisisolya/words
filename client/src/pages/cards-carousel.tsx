import React from 'react';
import { Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectedCardsSelector, currentCardNumberSelector } from '../store/selectors/cards';
import { setCurrentCardNumber } from '../store/slices/card-slice';

import ButtonContained from '../components/shared/button-contained';
import CardContainer from '../components/card/container';
import Container from '../components/shared/container';
import IconButton from '../components/shared/icon-button';
import LanguagesSwitcher from '../components/card/language-switcher';
import CardWords from '../containers/CardWords';

function EmptyCarousel() {
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

function CardsCarousel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentCardNumber = useSelector(currentCardNumberSelector);

  const [paginateForwards, setPaginateForwards] = React.useState(true);
  const selectedLanguages = useSelector(selectedCardsSelector);

  React.useEffect(() => {
    if (!selectedLanguages) {
      navigate('/');
    }
  }, []);

  const handlePagination = (direction: number) => {
    dispatch(
      setCurrentCardNumber(direction),
    );
    setPaginateForwards(direction === 1);
  };

  if (!selectedLanguages || selectedLanguages.length === 0) {
    return <EmptyCarousel />;
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
          <CardWords />
        </CardContainer>
        <IconButton
          disabled={currentCardNumber === selectedLanguages.length - 1}
          clickHandler={() => handlePagination(1)}
          Icon={ArrowForwardIosIcon}
        />
      </Stack>
      <ButtonContained
        text="Create card"
        clickHandler={() => navigate('create')}
      />
    </Container>
  );
}

export default CardsCarousel;
