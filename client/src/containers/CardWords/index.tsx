import React from 'react';

import { useSelector } from 'react-redux';
import { editedCardSelector, preferredLanguageSelector, selectedLanguagesSelector } from '../../store/selectors/cards';
import { useDeleteCardMutation, useEditCardMutation, useLazyGetSelectedCardsQuery } from '../../store/apis/card-api';

import { Card as CardType } from '../../types';
import useAlert from '../../hooks/use-alert';
import useModal from '../../hooks/use-modal';

import Card from '../../components/card/card';
import ReadonlyWords from '../../components/card/readonly-words';
import EditableWords from '../../components/card/editable-words';

interface WordCardProps {
  currentCard: CardType;
  currentCardNumber: number;
}

function CardWords({ currentCard, currentCardNumber }: WordCardProps) {
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const selectedLanguages = useSelector(selectedLanguagesSelector);
  const preferredLanguage = useSelector(preferredLanguageSelector);

  const {
    firstWord: firstWordEdited,
    secondWord: secondWordEdited,
  } = useSelector(editedCardSelector) || {};

  const [editingMode, setEditingMode] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);

  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();
  const [trigger] = useLazyGetSelectedCardsQuery();

  const { userId, cardId, ...words } = currentCard;
  const firstWord = words[selectedLanguages[0] as keyof typeof words];
  const secondWord = words[selectedLanguages[1] as keyof typeof words];

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage, currentCard]);

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
      acceptFunction: () => deleteCard({ userId, cardId: currentCard.cardId }).unwrap(),
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

  const editableObjects = [
    {
      value: firstWord,
      language: selectedLanguages[0],
      index: 'first',
    },
    {
      value: secondWord,
      language: selectedLanguages[1],
      index: 'second',
    },
  ];

  const text = editingMode ? (
    <EditableWords editableObjects={editableObjects} />
  ) : (
    <ReadonlyWords
      text={currentCard[currentLanguage as keyof CardType]}
    />
  );

  return (
    <Card
      text={text}
      toggleLanguage={toggleLanguage}
      editingMode={editingMode}
      handleCardEdit={handleCardEdit}
      handleCardDelete={handleCardDelete}
      handleModeChange={() => setEditingMode(!editingMode)}
    />
  );
}

export default CardWords;
