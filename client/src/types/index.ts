export interface Card {
  cardId: string,
  userId: string,
  firstWord: string,
  secondWord: string,
}
export interface User {
  firstName: string;
  lastName: string;
  id: string;
  cards?: Card[];
}
export interface CardModelFromServer {
  _id: string,
  user_id: string,
  english: string,
  russian: string,
}

export interface UserModelFromServer {
  first_name: string;
  last_name: string;
  _id: string;
  cards: CardModelFromServer[];
}
export type ModifiableWord = {
  language: string,
  word: string,
  filterable: string,
};
export interface ModifiableCard {
  first?: ModifiableWord,
  second?: ModifiableWord,
}

export interface Alert {
  isOpen: boolean,
  result?: number,
  entity?: string,
  action?: string,
}

export interface Modal {
  isOpen: boolean,
  acceptButtonHadler?: () => void,
  entity?: string,
  action?: string,
}
