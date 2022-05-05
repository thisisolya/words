import React from 'react';
import { useSelector } from 'react-redux';
import { last, head } from 'ramda';

import {
  currentCardNumberSelector,
  modifiableCardSelector,
  paginationDirectionSelector,
  selectedCardsSelector,
  selectedLanguagesSelector,
} from '../../store/selectors/cards';
import {
  useDeleteCardMutation,
  useEditCardMutation,
  useLazyGetSelectedCardsQuery,
} from '../../store/apis/card-api';
import { clearModifiableCard } from '../../store/slices/card-slice';

import { Card as CardType, ModifiableCard } from '../../types';
import useAlert from '../../hooks/useAlert';
import useModal from '../../hooks/useModal';

import CardComponent from '../../components/Card';

function Card() {
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const selectedCards = useSelector(selectedCardsSelector) as CardType[] || [];
  const selectedLanguages = useSelector(selectedLanguagesSelector) as string[];
  const currentCardNumber = useSelector(currentCardNumberSelector) as number;
  const paginationDirection = useSelector(paginationDirectionSelector) as boolean;
  const modifiableCard = useSelector(modifiableCardSelector) as ModifiableCard;

  const [editingMode, setEditingMode] = React.useState(false);

  const currentCard = selectedCards[currentCardNumber];
  const { userId, cardId, ...words } = currentCard;
  const firstWord = words[head(selectedLanguages) as keyof typeof words];
  const secondWord = words[last(selectedLanguages) as keyof typeof words];

  const { word: firstWordEdited } = modifiableCard.first || {};
  const { word: secondWordEdited } = modifiableCard.second || {};

  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();
  const [triggerSelectedCardsRefetch] = useLazyGetSelectedCardsQuery();

  React.useEffect(() => {
    if (editResult) {
      if (editResult.modifiedCount === 1) {
        showAlert({
          text: 'Word was sucessfullly edited!',
          severity: 'success',
        });
        triggerSelectedCardsRefetch({ userId, languages: selectedLanguages });
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
      clearModifiableCard();
    }
  }, [editResult]);

  React.useEffect(() => {
    triggerSelectedCardsRefetch({ userId, languages: selectedLanguages });
    if (deleteResult) {
      if (deleteResult.deletedCount === 1) {
        showAlert({
          text: 'Word was sucessfullly deleted!',
          severity: 'success',
        });
      } else {
        showAlert({ text: 'Something went wrong:(', severity: 'error' });
      }
      clearModifiableCard();
    }
  }, [deleteResult]);

  const toggleEditingMode = React.useCallback(() => {
    setEditingMode(!editingMode);
  }, [editingMode]);

  const deleteCardFunction = React.useCallback(() => {
    const deleteCardById = () => deleteCard({ userId, cardId }).unwrap();
    showModal({
      text: ' This is going to delete this card forever. There is no possibility to restore deleted cards',
      acceptFunction: () => deleteCardById,
    });
  }, [userId, cardId]);

  const handleCardEdit = React.useCallback(() => {
    editCard({
      userId,
      [selectedLanguages[0]]: firstWordEdited || firstWord,
      [selectedLanguages[1]]: secondWordEdited || secondWord,
      cardId,
    }).unwrap();
    setEditingMode(!editingMode);
  }, [firstWordEdited, secondWordEdited]);

  return (
    <CardComponent
      currentCardNumber={currentCardNumber}
      editingMode={editingMode}
      handleCardDelete={deleteCardFunction}
      handleCardEdit={handleCardEdit}
      handleModeChange={toggleEditingMode}
      paginationDirection={paginationDirection}
    />
  );
}

export default Card;
