import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { last, toPairs, head } from 'ramda';

import {
  currentCardNumberSelector,
  modifiableCardSelector,
  paginationDirectionSelector,
  preferredLanguageSelector,
  selectedCardsSelector,
  selectedLanguagesSelector,
  firstAutocompleteSelector,
  secondAutocompleteSelector,
} from '../../store/selectors/cards';
import {
  useDeleteCardMutation,
  useEditCardMutation,
  useLazyGetSelectedCardsQuery,
} from '../../store/apis/card-api';
import { clearModifiableCard, setModifiableFirstCard, setModifiableSecondCard } from '../../store/slices/card-slice';

import { Card as CardType, ModifiableCard } from '../../types';
import useAlert from '../../hooks/useAlert';
import useModal from '../../hooks/useModal';

import CardComponent from '../../components/Card';
import ReadonlyCardWords from '../../components/Card/ReadonlyCardWords';
import EditableCardWords from '../../components/Card/EditableCardWords';

function Card() {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { showModal } = useModal();

  const selectedCards = useSelector(selectedCardsSelector) as CardType[] || [];
  const selectedLanguages = useSelector(selectedLanguagesSelector) as string[];
  const preferredLanguage = useSelector(preferredLanguageSelector) as string;
  const currentCardNumber = useSelector(currentCardNumberSelector) as number;
  const paginationDirection = useSelector(paginationDirectionSelector) as boolean;
  const modifiableCard = useSelector(modifiableCardSelector) as ModifiableCard;

  const [editingMode, setEditingMode] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(preferredLanguage);

  const currentCard = selectedCards[currentCardNumber];
  const { userId, cardId, ...words } = currentCard;
  const currentWord = currentCard[currentLanguage as keyof CardType];
  const firstWord = words[head(selectedLanguages) as keyof typeof words];
  const secondWord = words[last(selectedLanguages) as keyof typeof words];

  const { word: firstWordEdited } = modifiableCard.first || {};
  const { word: secondWordEdited } = modifiableCard.second || {};

  const [deleteCard, { data: deleteResult }] = useDeleteCardMutation();
  const [editCard, { data: editResult }] = useEditCardMutation();
  const [triggerSelectedCardsRefetch] = useLazyGetSelectedCardsQuery();

  const modifiableCardFunction = {
    first: setModifiableFirstCard,
    second: setModifiableSecondCard,
  };

  const autocompleteSelector = {
    first: useSelector(firstAutocompleteSelector),
    second: useSelector(secondAutocompleteSelector),
  };

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

  const setNewCardInfo = (wordNumber: string, word: { [key:string]: string }) => {
    dispatch(modifiableCardFunction[wordNumber as keyof typeof modifiableCardFunction](word));
  };

  const getAutocompleteOPtions = (wordNumber: string) => (
    autocompleteSelector[wordNumber as keyof typeof autocompleteSelector]);

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
            autocompleteOptions={getAutocompleteOPtions}
            changeHandler={setNewCardInfo}
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
