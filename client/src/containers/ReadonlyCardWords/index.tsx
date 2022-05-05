import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { head, last, omit } from 'ramda';

import {
  currentCardNumberSelector,
  preferredLanguageSelector,
  selectedCardsSelector,
  selectedLanguagesSelector,
} from '../../store/selectors/cards';

import palette from '../../theme/palette';
import { Card } from '../../types';

const CustomizedTypography = styled(motion.p)`
font-weight: 600;
text-align: center;
color: ${palette.primary.dark};
`;

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
      <CustomizedTypography
        key={currentLanguage}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={toggleLanguage}
      >
        {words[currentLanguage as keyof typeof words]}
      </CustomizedTypography>
    </AnimatePresence>

  );
}

export default ReadonlyCardWords;
