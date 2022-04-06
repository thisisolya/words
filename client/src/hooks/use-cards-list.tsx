import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllCardsQuery } from '../store/api';
import { AppState } from '../store';
import { setSelectedUser } from '../store/slices/user-slice';
import { CardModelFromServer } from '../types';

const useCardsList = () => {
  const userId = localStorage.getItem('userId');

  const dispatch = useDispatch();
  const { data } = useGetAllCardsQuery({ userId });
  const cards = useSelector((state: AppState) => state.user.selectedUser?.cards);

  React.useEffect(() => {
    if (data) {
      dispatch(
        setSelectedUser({
          cards: data.map((card: CardModelFromServer) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { user_id, _id, ...words } = card;
            return ({
              ...words,
              userId: card.user_id,
              cardId: card._id,
            });
          }),
        }),
      );
    }
  }, [data, dispatch]);

  return cards;
};

export default useCardsList;
