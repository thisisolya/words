import React from 'react';
import { Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { head, last, omit } from 'ramda';

import {
  currentCardNumberSelector,
  preferredLanguageSelector,
  selectedCardsSelector,
  selectedLanguagesSelector,
} from '../../store/selectors/cards';

import { Card } from '../../types';

function ReadonlyCardWords() {
  const selectedCards = useSelector(selectedCardsSelector) as Card[] || [];
  const selectedLanguages = useSelector(selectedLanguagesSelector) as string[];
  const currentCardNumber = useSelector(currentCardNumberSelector) as number;
  const preferredLanguage = useSelector(preferredLanguageSelector) as string;
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);
  const words = omit(['userId', 'cardId'])(selectedCards[currentCardNumber]);

  const toggleLanguage = React.useCallback(() => {
    setCurrentLanguage(
      currentLanguage === head(selectedLanguages)
        ? last(selectedLanguages) || ''
        : head(selectedLanguages) || '',
    );
  }, [currentLanguage]);

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage]);

  return (
    <AnimatePresence>
      <Typography
        component={motion.div}
        key={currentLanguage}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={toggleLanguage}
        textAlign="center"
        fontWeight={600}
      >
        {words[currentLanguage as keyof typeof words]}
      </Typography>
    </AnimatePresence>

  );
}

export default ReadonlyCardWords;
