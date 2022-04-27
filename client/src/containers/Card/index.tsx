import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { last, toPairs, head } from 'ramda';

import { AppState } from '../../store';
import {
  autocompleteSelector,
  currentCardNumberSelector,
  editedCardSelector,
  paginationDirectionSelector,
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
import useAlert from '../../hooks/useAlert';
import useModal from '../../hooks/useModal';

import CardComponent from '../../components/Card';
import ReadonlyCardWords from '../../components/Card/ReadonlyCardWords';
import EditableCardWords from '../../components/Card/EditableCardWords';

function Card() {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const selectedCards = useSelector(selectedCardsSelector) || [];
  const selectedLanguages = useSelector(selectedLanguagesSelector);
  const preferredLanguage = useSelector(preferredLanguageSelector);
  const currentCardNumber = useSelector(currentCardNumberSelector);
  const paginationDirection = useSelector(paginationDirectionSelector);

  const {
    firstWord: firstWordEdited,
    secondWord: secondWordEdited,
  } = useSelector(editedCardSelector) || {};

  const [editingMode, setEditingMode] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);

  const currentCard = selectedCards[currentCardNumber];
  const { userId, cardId, ...words } = currentCard;
  const currentWord = currentCard[currentLanguage as keyof CardType];
  const firstWord = words[head(selectedLanguages) as keyof typeof words];
  const secondWord = words[last(selectedLanguages) as keyof typeof words];

  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();
  const [triggerSelectedCardsRefetch] = useLazyGetSelectedCardsQuery();

  React.useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage]);

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
    }
  }, [deleteResult]);

  const toggleLanguage = React.useCallback(() => {
    setCurrentLanguage(
      currentLanguage === head(selectedLanguages)
        ? last(selectedLanguages) || ''
        : head(selectedLanguages) || '',
    );
  }, [currentLanguage]);

  const toggleEditingMode = React.useCallback(() => {
    setEditingMode(!editingMode);
  }, [editingMode]);

  const setEditedCardInfo = React.useCallback((word: Record<string, string>) => (
    dispatch(
      setEditedCard(word),
    )), []);

  const deleteCardFunction = React.useCallback(() => {
    deleteCard({ userId, cardId }).unwrap();
  }, [userId, cardId]);

  const handleCardDelete = React.useCallback(() => {
    showModal({
      text: ' This is going to delete this card forever. There is no possibility to restore deleted cards',
      acceptFunction: () => deleteCardFunction,
    });
  }, []);

  const handleCardEdit = React.useCallback(() => {
    editCard({
      userId,
      [selectedLanguages[0]]: firstWordEdited || firstWord,
      [selectedLanguages[1]]: secondWordEdited || secondWord,
      cardId,
    }).unwrap();
    setEditingMode(!editingMode);
  }, [firstWordEdited, secondWordEdited]);

  const getAutocompleteSelector = (count: string) => (
    useSelector((state: AppState) => autocompleteSelector(state.card.editedCard, count))
  );

  const setAutocompleteOptions = (options: Record<string, string>) => {
    dispatch(setEditedCard(options));
  };

  return (
    <CardComponent
      currentCardNumber={currentCardNumber}
      editingMode={editingMode}
      handleCardDelete={handleCardDelete}
      handleCardEdit={handleCardEdit}
      handleModeChange={toggleEditingMode}
      text={editingMode
        ? (
          <EditableCardWords
            autocompleteOptions={getAutocompleteSelector}
            clickHandler={setEditedCardInfo}
            inputHandler={setAutocompleteOptions}
            words={toPairs(words)}
          />
        )
        : <ReadonlyCardWords text={currentWord} />}
      toggleLanguage={toggleLanguage}
      paginationDirection={paginationDirection}
    />
  );
}

export default Card;
