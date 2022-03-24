import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCardsQuery } from "../store/api";
import { setSelectedUser } from "../store/slice";
import { AppState } from "../store";
import { CardModelFromServer } from "../types";

const useCardsList = () => {
  const userId = localStorage.getItem("userId");

  const dispatch = useDispatch();
  const { data } = useGetAllCardsQuery({ userId });
  const cards = useSelector(
    (state: AppState) => state.users.selectedUser?.cards
  );

  React.useEffect(() => {
    data &&
      dispatch(
        setSelectedUser({
          cards: data.map((card: CardModelFromServer) => ({
            english: card.english,
            russian: card.russian,
            userId: card.user_id,
            cardId: card._id,
          })),
        })
      );
  }, [data, dispatch]);

  return cards;
};

export default useCardsList;
