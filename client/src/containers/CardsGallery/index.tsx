import React from 'react';
import { Stack } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { head, last } from 'ramda';

import {
  selectedCardsSelector,
  currentCardNumberSelector,
  preferredLanguageSelector,
  selectedLanguagesSelector,
} from '../../store/selectors/cards';
import {
  setCurrentCardNumber,
  setPreferredLanguage,
} from '../../store/slices/card-slice';
import { Card as CardType } from '../../types';

import Card from '../Card';
import LanguagesSwitcher from '../../components/LanguagesSwitcher';
import ButtonContained from '../../components/ButtonContained';
import EmptyGallery from '../../components/EmptyGallery';
import AnimatedContainer from '../../components/AnimatedContainer';
import IconButton from '../../components/IconButton';

function CardsGallery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedCards = useSelector(selectedCardsSelector) as CardType[];
  const currentCardNumber = useSelector(currentCardNumberSelector) as number;
  const selectedLanguages = useSelector(selectedLanguagesSelector) as string[];
  const preferredLanguage = useSelector(preferredLanguageSelector) as string;

  React.useEffect(() => {
    if (!selectedCards) {
      navigate('/');
    }
  }, []);

  const toggleLanguage = React.useCallback(() => {
    dispatch(
      setPreferredLanguage(
        preferredLanguage === head(selectedLanguages)
          ? last(selectedLanguages)
          : head(selectedLanguages),
      ),
    );
  }, [preferredLanguage]);

  const handlePagination = React.useCallback((direction: number) => {
    dispatch(
      setCurrentCardNumber(direction),
    );
  }, [currentCardNumber]);

  if (!selectedCards || selectedCards.length === 0) {
    return <EmptyGallery clickHandler={() => navigate('cards/create')} />;
  }

  return (
    <AnimatedContainer>
      <LanguagesSwitcher toggleLanguage={toggleLanguage} selectedLanguages={selectedLanguages} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          disabled={currentCardNumber === 0}
          clickHandler={() => handlePagination(-1)}
          Icon={ArrowBackIosIcon}
        />
        <Card />
        <IconButton
          disabled={currentCardNumber === selectedCards.length - 1}
          clickHandler={() => handlePagination(1)}
          Icon={ArrowForwardIosIcon}
        />
      </Stack>
      <ButtonContained
        text="Create card"
        clickHandler={() => navigate('create')}
      />
    </AnimatedContainer>
  );
}

export default CardsGallery;
