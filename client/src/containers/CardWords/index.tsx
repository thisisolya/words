import React from 'react';

import { useSelector } from 'react-redux';
import { toPairs } from 'ramda';
import {
  currentCardNumberSelector,
  editedCardSelector,
  preferredLanguageSelector,
  selectedCardsSelector,
  selectedLanguagesSelector,
} from '../../store/selectors/cards';
import {
  useDeleteCardMutation,
  useEditCardMutation,
  useLazyGetSelectedCardsQuery,
} from '../../store/apis/card-api';
import { setEditedCard } from '../../store/slices/card-slice';

import { Card as CardType } from '../../types';
import useAlert from '../../hooks/use-alert';
import useModal from '../../hooks/use-modal';

import Card from '../../components/card/card';
import ReadonlyWords from '../../components/card/readonly-words';
import EditableWords from '../../components/card/editable-words';

function CardWords() {
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const selectedCards = useSelector(selectedCardsSelector) || [];
  const selectedLanguages = useSelector(selectedLanguagesSelector);
  const preferredLanguage = useSelector(preferredLanguageSelector);
  const currentCardNumber = useSelector(currentCardNumberSelector);
  const {
    firstWord: firstWordEdited,
    secondWord: secondWordEdited,
  } = useSelector(editedCardSelector) || {};

  const [editingMode, setEditingMode] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);

  const currentCard = selectedCards[currentCardNumber];
  const { userId, cardId, ...words } = currentCard;
  const currentWord = currentCard[currentLanguage as keyof CardType];
  const firstWord = words[selectedLanguages[0] as keyof typeof words];
  const secondWord = words[selectedLanguages[1] as keyof typeof words];

  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();
  const [trigger] = useLazyGetSelectedCardsQuery();

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage, currentCardNumber]);

  const toggleLanguage = () => setCurrentLanguage(
    currentLanguage === selectedLanguages[0]
      ? selectedLanguages[1]
      : selectedLanguages[0],
  );

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage, currentCardNumber]);

  React.useEffect(() => {
    if (editResult) {
      if (editResult.modifiedCount === 1) {
        showAlert({
          text: 'Word was sucessfullly edited!',
          severity: 'success',
        });
        trigger({ userId, languages: selectedLanguages });
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
    }
  }, [editResult]);

  React.useEffect(() => {
    trigger({ userId, languages: selectedLanguages });
    if (deleteResult) {
      if (deleteResult.deletedCount === 1) {
        showAlert({
          text: 'Word was sucessfullly deleted!',
          severity: 'success',
        });
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
    }
  }, [deleteResult]);

  const handleCardDelete = () => {
    showModal({
      text: ' This is going to delete this card forever. There is no possibility to restore deleted cards',
      acceptFunction: () => deleteCard({ userId, cardId }).unwrap(),
    });
  };

  const handleCardEdit = () => {
    editCard({
      userId,
      [selectedLanguages[0]]: firstWordEdited || firstWord,
      [selectedLanguages[1]]: secondWordEdited || secondWord,
      cardId,
    }).unwrap();
    setEditingMode(!editingMode);
  };

  const cardText = editingMode ? (
    <EditableWords words={toPairs(words)} actionType={setEditedCard} />
  ) : (
    <ReadonlyWords
      text={currentWord}
    />
  );

  return (
    <Card
      text={cardText}
      toggleLanguage={toggleLanguage}
      editingMode={editingMode}
      handleCardEdit={handleCardEdit}
      handleCardDelete={handleCardDelete}
      handleModeChange={() => setEditingMode(!editingMode)}
    />
  );
}

export default CardWords;
